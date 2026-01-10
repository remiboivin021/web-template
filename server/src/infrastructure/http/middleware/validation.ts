/**
 * @file validation.ts
 * @brief Request validation middleware
 * @description Provides validation utilities for request payloads
 */

import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errorHandler';

/**
 * @function validateBody
 * @brief Validates request body against a schema
 * @param schema - Validation schema function
 * @returns Express middleware function
 */
export function validateBody<T>(
    schema: (body: unknown) => { isValid: boolean; errors?: string[] }
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema(req.body);
        
        if (!result.isValid) {
            throw new ValidationError('Request body validation failed', result.errors);
        }
        
        next();
    };
}

/**
 * @function validateCreateUser
 * @brief Simple validation for user creation
 * @param body - Request body to validate
 * @returns Validation result
 */
export function validateCreateUser(body: unknown): { isValid: boolean; errors?: string[] } {
    const errors: string[] = [];
    
    if (!body || typeof body !== 'object') {
        return { isValid: false, errors: ['Body must be an object'] };
    }
    
    const data = body as Record<string, unknown>;
    
    if (!data.email || typeof data.email !== 'string') {
        errors.push('Email is required and must be a string');
    }
    
    if (!data.password || typeof data.password !== 'string') {
        errors.push('Password is required and must be a string');
    }
    
    return errors.length > 0 
        ? { isValid: false, errors } 
        : { isValid: true };
}

/**
 * @function validateUpdateUser
 * @brief Simple validation for user update
 * @param body - Request body to validate
 * @returns Validation result
 */
export function validateUpdateUser(body: unknown): { isValid: boolean; errors?: string[] } {
    if (!body || typeof body !== 'object') {
        return { isValid: false, errors: ['Body must be an object'] };
    }
    
    // At least one field should be present for update
    const data = body as Record<string, unknown>;
    const hasFields = Object.keys(data).length > 0;
    
    return hasFields
        ? { isValid: true }
        : { isValid: false, errors: ['At least one field is required for update'] };
}
