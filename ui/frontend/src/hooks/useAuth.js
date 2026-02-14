import { useEffect } from 'react';
import { useAuth } from '../contexts/authStore';

export const useAuthCheck = () => {
  const { initializeAuth, isLoading } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);

  return { isLoading };
};

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useAuthUser = () => {
  const { user } = useAuth();
  return user;
};
