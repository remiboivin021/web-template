/**
 * @file errorHandler.ts
 * @brief Global error handling middleware
 * @description Catches and formats errors for HTTP responses
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @interface ApiError
 * @brief Structured error format for API responses
 */
export interface ApiError extends Error {
    statusCode?: number;
    details?: unknown;
}

/**
 * @function errorHandler
 * @brief Express error handling middleware
 * @param error - The error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export function errorHandler(
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    console.error('[Error Handler]:', {
        statusCode,
        message,
        stack: error.stack,
        path: req.path,
        method: req.method,
    });

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                details: error.details,
            }),
        },
    });
}

/**
 * @class NotFoundError
 * @brief Error for 404 Not Found responses
 */
export class NotFoundError extends Error {
    statusCode = 404;
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * @class ValidationError
 * @brief Error for validation failures
 */
export class ValidationError extends Error {
    statusCode = 400;
    details?: unknown;
    constructor(message = 'Validation failed', details?: unknown) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
    }
}

/**
 * @class UnauthorizedError
 * @brief Error for unauthorized access
 */
export class UnauthorizedError extends Error {
    statusCode = 401;
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
