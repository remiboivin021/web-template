/**
 * Page: Login
 * User login page with form validation
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import type { LoginFormData } from '@/utils/validation';
import styles from './Auth.module.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string>('');

  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useForm<LoginFormData>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        try {
          setServerError('');
          await login(values.email, values.password);
          navigate('/dashboard');
        } catch (error) {
          setServerError(error instanceof Error ? error.message : 'Login failed');
        }
      },
      validate: (values) => {
        const errors: Partial<Record<keyof LoginFormData, string>> = {};
        if (!values.email) {
          errors.email = 'Email is required';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors;
      },
    });

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {serverError && <div className={styles.error}>{serverError}</div>}

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
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Login
          </Button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};
