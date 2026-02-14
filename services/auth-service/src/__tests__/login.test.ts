import request from 'supertest';
import UserModel from '../models/UserSchema';
import { connectDB, disconnectDB, clearDB } from './setup';
import { hashPassword } from '../utils/tokenUtils';
import { createTestApp } from './app';

const app = createTestApp();

describe('Auth Service - Login Endpoint', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.token).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.name).toBe('John Doe');
    });

    it('should fail if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'Password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Email and password are required');
    });

    it('should fail if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Email and password are required');
    });

    it('should fail with non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid credentials');
    });

    it('should fail with incorrect password', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid credentials');
    });

    it('should work with uppercase email and normalize it', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'TEST@EXAMPLE.COM',
          password: 'Password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
    });

    it('should return valid JWT token', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(200);
      const tokenParts = res.body.token.split('.');
      expect(tokenParts).toHaveLength(3); // JWT format: header.payload.signature
    });

    it('should return user role in response', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'rider@example.com',
          password: 'Password123',
          name: 'John Rider',
          role: 'rider'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'rider@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.user.role).toBe('rider');
    });
  });
});
