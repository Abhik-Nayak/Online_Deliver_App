import request from 'supertest';
import express from 'express';

const app = express();
app.get('/health', (req, res) => {
  res.json({ status: 'Auth Service is running', timestamp: new Date() });
});

describe('Auth Service - Health Check Endpoint', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Auth Service is running');
      expect(res.body.timestamp).toBeDefined();
    });

    it('should return valid timestamp', async () => {
      const res = await request(app)
        .get('/health');

      expect(res.status).toBe(200);
      const timestamp = new Date(res.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should be accessible without authentication', async () => {
      const res = await request(app)
        .get('/health');

      expect(res.status).toBe(200);
    });
  });
});
