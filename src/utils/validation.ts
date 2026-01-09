/**
 * Validation utilities using Zod
 * Ensures type safety for forms and API responses
 */

import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const userSchema = z.object({
  id: z.string(),
  email: emailSchema,
  name: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
