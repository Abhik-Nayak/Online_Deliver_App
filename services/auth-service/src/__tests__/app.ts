import express, { Express } from 'express';
import authRoutes from '../routes/authRoutes';

export function createTestApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'Auth Service is running', timestamp: new Date() });
  });

  return app;
}
