# Auth Service

A standalone authentication microservice built with Node.js, Express.js, and TypeScript.

## Features

- User registration with validation
- User login with JWT tokens
- Token refresh mechanism
- Password hashing with bcryptjs
- JWT authentication middleware
- Input validation for email, password, name, and phone
- Multiple user roles support (customer, restaurant, rider, admin)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5001
JWT_SECRET=your-jwt-secret-key
REFRESH_SECRET=your-refresh-secret-key
DATABASE_URL=mongodb://localhost:27017/delivery-app
NODE_ENV=development
```

## Running the Service

### Development mode:
```bash
npm run dev
```

### Build:
```bash
npm run build
```

### Production mode:
```bash
npm start
```

## API Endpoints

### Register User
**POST** `/api/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+1234567890",
  "role": "customer"
}
```

### Login
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

### Get Current User
**GET** `/api/auth/me`

Headers:
```
Authorization: Bearer {token}
```

### Refresh Token
**POST** `/api/auth/refresh-token`

Request body:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Logout
**POST** `/api/auth/logout`

Headers:
```
Authorization: Bearer {token}
```

### Health Check
**GET** `/health`

## Project Structure

```
auth-service/
├── src/
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Express middlewares
│   ├── models/          # TypeScript interfaces
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env.example
```

## Notes

- Currently uses in-memory storage for users. Replace with actual database (MongoDB, PostgreSQL, etc.)
- Password must be at least 8 characters
- Email validation uses regex pattern
- Tokens expire in 1 hour, refresh tokens in 7 days
- All responses include proper HTTP status codes and error messages
