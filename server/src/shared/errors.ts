/**
 * @file errors.ts
 * @brief Custom error classes for the application
 * @description Provides structured error handling across all layers
 */

/**
 * @class BaseError
 * @brief Base class for all application errors
 */
export abstract class BaseError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly timestamp: string;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true,
        details?: unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();
        this.details = details;

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * @class ValidationError
 * @brief Validation-related errors (400)
 */
export class ValidationError extends BaseError {
    constructor(message: string, details?: unknown) {
        super(message, 400, true, details);
    }
}

/**
 * @class UnauthorizedError
 * @brief Authentication errors (401)
 */
export class UnauthorizedError extends BaseError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401, true);
    }
}

/**
 * @class ForbiddenError
 * @brief Authorization errors (403)
 */
export class ForbiddenError extends BaseError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403, true);
    }
}

/**
 * @class NotFoundError
 * @brief Resource not found errors (404)
 */
export class NotFoundError extends BaseError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, 404, true);
    }
}

/**
 * @class ConflictError
 * @brief Resource conflict errors (409)
 */
export class ConflictError extends BaseError {
    constructor(message: string, details?: unknown) {
        super(message, 409, true, details);
    }
}

/**
 * @class InternalServerError
 * @brief Internal server errors (500)
 */
export class InternalServerError extends BaseError {
    constructor(message: string = 'Internal server error', details?: unknown) {
        super(message, 500, false, details);
    }
}

/**
 * @class DatabaseError
 * @brief Database-related errors (500)
 */
export class DatabaseError extends BaseError {
    constructor(message: string, details?: unknown) {
        super(message, 500, false, details);
    }
}

/**
 * @class ExternalServiceError
 * @brief External service/API errors (502)
 */
export class ExternalServiceError extends BaseError {
    constructor(service: string, details?: unknown) {
        super(`External service error: ${service}`, 502, true, details);
    }
}

/**
 * @class BadRequestError
 * @brief Bad request errors (400)
 */
export class BadRequestError extends BaseError {
    constructor(message: string = 'Bad request', details?: unknown) {
        super(message, 400, true, details);
    }
}

/**
 * @brief Type guard to check if error is operational
 */
export function isOperationalError(error: Error): boolean {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

/**
 * @brief Format error for API response
 */
export interface ErrorResponse {
    success: false;
    error: {
        name: string;
        message: string;
        statusCode: number;
        timestamp: string;
        details?: unknown;
        stack?: string;
    };
}

export function formatErrorResponse(error: BaseError, includeStack: boolean = false): ErrorResponse {
    const response: ErrorResponse = {
        success: false,
        error: {
            name: error.name,
            message: error.message,
            statusCode: error.statusCode,
            timestamp: error.timestamp,
        },
    };

    if (error.details) {
        response.error.details = error.details;
    }

    if (includeStack && error.stack) {
        response.error.stack = error.stack;
    }

    return response;
}
