/**
 * Custom Hook: useAuth
 * Provides authentication functionality with proper error handling
 */

import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } =
    useAuthStore();
  const addToast = useUIStore((state) => state.addToast);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      addToast({ type: 'success', message: 'Successfully logged in!' });
    } catch (error) {
      addToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      await register(email, password, name);
      addToast({ type: 'success', message: 'Account created successfully!' });
    } catch (error) {
      addToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Registration failed',
      });
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      addToast({ type: 'info', message: 'Logged out successfully' });
    } catch (error) {
      addToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Logout failed',
      });
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  };
}
