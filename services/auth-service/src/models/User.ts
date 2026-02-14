export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'customer' | 'restaurant' | 'rider' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'customer' | 'restaurant' | 'rider' | 'admin';
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}
