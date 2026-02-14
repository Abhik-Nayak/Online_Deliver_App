import cors from 'cors';

/**
 * CORS Configuration for Auth Service
 * Allows requests from frontend and other microservices
 */

const getAllowedOrigins = (): string[] => {
  const environment = process.env.NODE_ENV || 'development';

  // Development origins
  const devOrigins = [
    'http://localhost:3000',     // Alternative frontend port
    'http://localhost:5173',     // Vite default port
    'http://localhost:5174',     // Backup port
    'http://127.0.0.1:5173',    // Localhost IPv4
    'http://127.0.0.1:3000',    // Localhost IPv4 alt
  ];

  // Production origins
  const prodOrigins = [
    process.env.FRONTEND_URL || 'https://app.example.com',
    process.env.APP_URL || 'https://example.com',
  ].filter(Boolean);

  // Additional allowed origins from environment
  const customOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : [];

  // Combine origins based on environment
  const origins = environment === 'production' ? prodOrigins : devOrigins;

  return [...origins, ...customOrigins];
};

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || process.env.NODE_ENV === 'test') {
      callback(null, true);
      return;
    }

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },

  // Allow these HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  // Allow these headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],

  // Expose these headers to the client
  exposedHeaders: [
    'Content-Length',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
  ],

  // Allow credentials (cookies, authorization headers)
  credentials: true,

  // Cache preflight requests for 1 hour
  maxAge: 3600,
};

/**
 * Alternative CORS configuration for development
 * More permissive, useful for rapid development
 */
export const corsOptionsDevFriendly: cors.CorsOptions = {
  origin: '*',  // Allow any origin in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['*'],
  credentials: false,
  maxAge: 3600,
};

/**
 * Create CORS middleware
 * Uses strict CORS in production, lenient in development
 */
export const getCorsMiddleware = (): any => {
  const environment = process.env.NODE_ENV || 'development';
  const options = environment === 'production' ? corsOptions : corsOptionsDevFriendly;

  return cors(options);
};

export default getCorsMiddleware();
