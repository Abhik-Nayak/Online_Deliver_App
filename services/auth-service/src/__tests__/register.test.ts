import request from 'supertest';
import UserModel from '../models/UserSchema';
import { connectDB, disconnectDB, clearDB } from './setup';
import { createTestApp } from './app';

const app = createTestApp();

describe('Auth Service - Register Endpoint', () => {
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

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe',
          phone: '1234567890'
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.name).toBe('John Doe');
      expect(res.body.user.role).toBe('customer');
    });

    it('should fail if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'Password123',
          name: 'John Doe'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should fail if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          name: 'John Doe'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should fail if name is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should fail with invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Password123',
          name: 'John Doe'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Invalid email');
    });

    it('should fail with password less than 8 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short',
          name: 'John Doe'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 8 characters');
    });

    it('should fail with name less than 2 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'J'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 2 characters');
    });

    it('should fail if user already exists', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'Jane Doe'
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toContain('User already exists');
    });

    it('should accept custom role', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'rider@example.com',
          password: 'Password123',
          name: 'Rider Name',
          role: 'rider'
        });

      expect(res.status).toBe(201);
      expect(res.body.user.role).toBe('rider');
    });

    it('should convert email to lowercase', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'TEST@EXAMPLE.COM',
          password: 'Password123',
          name: 'John Doe'
        });

      expect(res.status).toBe(201);
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should hash password before saving', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'John Doe'
        });

      const user = await UserModel.findOne({ email: 'test@example.com' });
      expect(user?.password).not.toBe('Password123');
      expect(user?.password).toBeDefined();
    });
  });
});
