import request from 'supertest';
import { generateTokens } from '../utils/tokenUtils';
import { connectDB, disconnectDB, clearDB } from './setup';
import { createTestApp } from './app';

const app = createTestApp();

describe('Auth Service - Refresh Token Endpoint', () => {
  let refreshToken: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();

    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123',
        name: 'John Doe'
      });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123'
      });

    refreshToken = loginRes.body.refreshToken;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should refresh token successfully with valid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: refreshToken
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
      expect(res.body.message).toBe('Token refreshed successfully');
    });

    it('should return new tokens of correct format', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: refreshToken
        });

      expect(res.status).toBe(200);
      const tokenParts = res.body.token.split('.');
      expect(tokenParts).toHaveLength(3); // JWT format

      const refreshTokenParts = res.body.refreshToken.split('.');
      expect(refreshTokenParts).toHaveLength(3);
    });

    it('should fail if refresh token is missing', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Refresh token is required');
    });

    it('should fail with invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: 'invalid.refresh.token'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    it('should fail with malformed refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: 'malformed-token'
        });

      expect(res.status).toBe(401);
    });

    it('should refresh multiple times', async () => {
      let currentRefreshToken = refreshToken;

      for (let i = 0; i < 3; i++) {
        const res = await request(app)
          .post('/api/auth/refresh-token')
          .send({
            refreshToken: currentRefreshToken
          });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();

        currentRefreshToken = res.body.refreshToken;
      }
    });

    it('should allow using new token after refresh', async () => {
      const refreshRes = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: refreshToken
        });

      expect(refreshRes.status).toBe(200);

      const newToken = refreshRes.body.token;

      const meRes = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${newToken}`);

      expect(meRes.status).toBe(200);
      expect(meRes.body.user.email).toBe('test@example.com');
    });
  });
});
