/**
 * @file constants.ts
 * @brief Application-wide constants
 * @description Centralized constants used across the application
 */

/**
 * @brief HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;

/**
 * @brief Common error messages
 */
export const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'An internal server error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_TOKEN: 'Invalid or expired token',
    MISSING_REQUIRED_FIELD: 'Missing required field',
} as const;

/**
 * @brief Success messages
 */
export const SUCCESS_MESSAGES = {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
} as const;

/**
 * @brief Pagination defaults
 */
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;

/**
 * @brief Validation constraints
 */
export const VALIDATION = {
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    EMAIL_MAX_LENGTH: 255,
    NAME_MAX_LENGTH: 100,
} as const;

/**
 * @brief Date/Time formats
 */
export const DATE_FORMATS = {
    ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    DATE_ONLY: 'YYYY-MM-DD',
    TIME_ONLY: 'HH:mm:ss',
    DISPLAY: 'MMM DD, YYYY',
    DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
} as const;

/**
 * @brief Environment constants
 */
export const ENVIRONMENT = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
    STAGING: 'staging',
} as const;

/**
 * @brief Cache/Rate limit TTL values (in seconds)
 */
export const TTL = {
    ONE_MINUTE: 60,
    FIVE_MINUTES: 300,
    TEN_MINUTES: 600,
    THIRTY_MINUTES: 1800,
    ONE_HOUR: 3600,
    ONE_DAY: 86400,
    ONE_WEEK: 604800,
} as const;

/**
 * @brief Regular expressions
 */
export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    USERNAME: /^[a-zA-Z0-9_-]+$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
} as const;

/**
 * @brief Default configuration values
 */
export const DEFAULTS = {
    PORT: 3000,
    HOST: 'localhost',
    CORS_ORIGIN: '*',
    REQUEST_TIMEOUT: 30000, // 30 seconds
    MAX_REQUEST_SIZE: '10mb',
} as const;
