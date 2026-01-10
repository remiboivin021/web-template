/**
 * @file validators.ts
 * @brief Common validation utilities
 * @description Provides reusable validation functions
 */

import { ValidationError } from './errors';

/**
 * @brief Validation result type
 */
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * @brief Email validation
 */
export function validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief Password validation
 */
export interface PasswordRequirements {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
}

export function validatePassword(
    password: string,
    requirements: PasswordRequirements = {}
): ValidationResult {
    const {
        minLength = 8,
        requireUppercase = true,
        requireLowercase = true,
        requireNumbers = true,
        requireSpecialChars = false,
    } = requirements;

    const errors: string[] = [];

    if (!password) {
        errors.push('Password is required');
        return { isValid: false, errors };
    }

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief Username validation
 */
export function validateUsername(username: string, minLength: number = 3, maxLength: number = 30): ValidationResult {
    const errors: string[] = [];
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!username) {
        errors.push('Username is required');
    } else {
        if (username.length < minLength) {
            errors.push(`Username must be at least ${minLength} characters long`);
        }
        if (username.length > maxLength) {
            errors.push(`Username must be at most ${maxLength} characters long`);
        }
        if (!usernameRegex.test(username)) {
            errors.push('Username can only contain letters, numbers, underscores, and hyphens');
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief String length validation
 */
export function validateStringLength(
    value: string,
    fieldName: string,
    minLength?: number,
    maxLength?: number
): ValidationResult {
    const errors: string[] = [];

    if (!value) {
        errors.push(`${fieldName} is required`);
        return { isValid: false, errors };
    }

    if (minLength !== undefined && value.length < minLength) {
        errors.push(`${fieldName} must be at least ${minLength} characters long`);
    }

    if (maxLength !== undefined && value.length > maxLength) {
        errors.push(`${fieldName} must be at most ${maxLength} characters long`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief Required field validation
 */
export function validateRequired(value: unknown, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value === null || value === undefined || value === '') {
        errors.push(`${fieldName} is required`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief Number range validation
 */
export function validateNumberRange(
    value: number,
    fieldName: string,
    min?: number,
    max?: number
): ValidationResult {
    const errors: string[] = [];

    if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`${fieldName} must be a valid number`);
        return { isValid: false, errors };
    }

    if (min !== undefined && value < min) {
        errors.push(`${fieldName} must be at least ${min}`);
    }

    if (max !== undefined && value > max) {
        errors.push(`${fieldName} must be at most ${max}`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief UUID validation
 */
export function validateUUID(value: string, fieldName: string = 'ID'): ValidationResult {
    const errors: string[] = [];
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!value) {
        errors.push(`${fieldName} is required`);
    } else if (!uuidRegex.test(value)) {
        errors.push(`${fieldName} must be a valid UUID`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * @brief Combine multiple validation results
 */
export function combineValidations(...results: ValidationResult[]): ValidationResult {
    const allErrors = results.flatMap(result => result.errors);
    return {
        isValid: allErrors.length === 0,
        errors: allErrors,
    };
}

/**
 * @brief Throw ValidationError if validation fails
 */
export function assertValid(result: ValidationResult, context?: string): void {
    if (!result.isValid) {
        throw new ValidationError(
            context ? `${context}: ${result.errors.join(', ')}` : result.errors.join(', '),
            { errors: result.errors }
        );
    }
}
