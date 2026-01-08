/**
 * Authentication service
 * Handles user authentication operations
 */

import { apiClient } from './api';
import { localStore } from '@/utils/storage';
import type { User, LoginCredentials, RegisterData, AuthTokens } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
      '/auth/login',
      credentials
    );
    localStore.set('accessToken', response.tokens.accessToken);
    localStore.set('refreshToken', response.tokens.refreshToken);
    return response;
  },

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
      '/auth/register',
      data
    );
    localStore.set('accessToken', response.tokens.accessToken);
    localStore.set('refreshToken', response.tokens.refreshToken);
    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStore.remove('accessToken');
      localStore.remove('refreshToken');
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = localStore.get<string>('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const tokens = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken });
    localStore.set('accessToken', tokens.accessToken);
    localStore.set('refreshToken', tokens.refreshToken);
    return tokens;
  },

  isAuthenticated(): boolean {
    return !!localStore.get<string>('accessToken');
  },
};
