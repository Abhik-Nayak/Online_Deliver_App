import request from 'supertest';
import { generateTokens } from '../utils/tokenUtils';
import { connectDB, disconnectDB, clearDB } from './setup';
import { createTestApp } from './app';

const app = createTestApp();

describe('Auth Service - Protected Endpoints (Logout & Get Current User)', () => {
  let accessToken: string;
  let refreshToken: string;
  let userId: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123',
        name: 'John Doe'
      });

    userId = res.body.user.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123'
      });

    accessToken = loginRes.body.token;
    refreshToken = loginRes.body.refreshToken;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully with valid token', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
    });

    it('should fail without token', async () => {
      const res = await request(app)
        .post('/api/auth/logout');

      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    it('should fail with invalid token', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(res.status).toBe(401);
    });

    it('should fail with malformed authorization header', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', 'InvalidFormat');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should get current user info with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.name).toBe('John Doe');
      expect(res.body.user.id).toBeDefined();
    });

    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    it('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(res.status).toBe(401);
    });

    it('should return user role in response', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user.role).toBe('customer');
    });

    it('should return user phone in response', async () => {
      await clearDB();

      const regRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'withphone@example.com',
          password: 'Password123',
          name: 'Jane Doe',
          phone: '9876543210'
        });

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'withphone@example.com',
          password: 'Password123'
        });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${loginRes.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.user.phone).toBe('9876543210');
    });

    it('should return all user fields', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('email');
      expect(res.body.user).toHaveProperty('name');
      expect(res.body.user).toHaveProperty('role');
    });
  });
});
