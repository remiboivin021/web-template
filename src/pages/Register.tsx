/**
 * Page: Register
 * User registration page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import type { RegisterFormData } from '@/utils/validation';
import styles from './Auth.module.css';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [serverError, setServerError] = useState<string>('');

  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useForm<RegisterFormData>({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        try {
          setServerError('');
          await register(values.email, values.password, values.name);
          navigate('/dashboard');
        } catch (error) {
          setServerError(error instanceof Error ? error.message : 'Registration failed');
        }
      },
      validate: (values) => {
        const errors: Partial<Record<keyof RegisterFormData, string>> = {};
        if (!values.name || values.name.length < 2) {
          errors.name = 'Name must be at least 2 characters';
        }
        if (!values.email) {
          errors.email = 'Email is required';
        }
        if (!values.password || values.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }
        return errors;
      },
    });

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.subtitle}>Create a new account to get started.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {serverError && <div className={styles.error}>{serverError}</div>}

          <Input
            type="text"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            placeholder="John Doe"
            fullWidth
            required
            autoComplete="name"
          />

          <Input
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            placeholder="you@example.com"
            fullWidth
            required
            autoComplete="email"
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            placeholder="••••••••"
            fullWidth
            required
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Sign Up
          </Button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};
