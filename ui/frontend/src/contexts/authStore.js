import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuth = create((set, get) => ({
  // State
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Check auth token on app load
  initializeAuth: async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        set({ isLoading: true, error: null });
        const { user } = await authService.getCurrentUser();
        set({ user, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, isAuthenticated: false, error: error.message });
      } finally {
        set({ isLoading: false });
      }
    }
  },

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(email, password);
      set({ user: data.user, isAuthenticated: true });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Register
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Google login
  googleLogin: async (googleToken) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.googleLogin(googleToken);
      set({ user: data.user, isAuthenticated: true });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Update user
  setUser: (user) => set({ user }),
}));
