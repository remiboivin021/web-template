/**
 * @file types.ts
 * @brief Common type definitions
 * @description Shared types used across the application
 */

/**
 * @brief Generic success response
 */
export interface SuccessResponse<T = unknown> {
    success: true;
    data: T;
    message?: string;
    meta?: ResponseMeta;
}

/**
 * @brief Generic error response for API
 */
export interface ApiErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
        details?: unknown;
        stack?: string;
    };
}

/**
 * @brief API Response type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ApiErrorResponse;

/**
 * @brief Response metadata
 */
export interface ResponseMeta {
    timestamp: string;
    requestId?: string;
    version?: string;
}

/**
 * @brief Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * @brief Paginated response
 */
export interface PaginatedResponse<T> {
    success: true;
    data: T[];
    pagination: PaginationMeta;
}

/**
 * @brief Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * @brief Query parameters for list endpoints
 */
export interface QueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    search?: string;
    filters?: Record<string, unknown>;
}

/**
 * @brief Generic ID type
 */
export type ID = string | number;

/**
 * @brief Timestamp fields
 */
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @brief Soft delete timestamp
 */
export interface SoftDelete {
    deletedAt: Date | null;
}

/**
 * @brief Base entity with common fields
 */
export interface BaseEntity extends Timestamps {
    id: string;
}

/**
 * @brief Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * @brief Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * @brief Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @brief Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * @brief Deep partial type
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * @brief Constructor type
 */
export type Constructor<T = unknown> = new (...args: unknown[]) => T;

/**
 * @brief Abstract constructor type
 */
export type AbstractConstructor<T = unknown> = abstract new (...args: unknown[]) => T;

/**
 * @brief Function type
 */
export type Fn<TArgs extends unknown[] = unknown[], TReturn = unknown> = (...args: TArgs) => TReturn;

/**
 * @brief Async function type
 */
export type AsyncFn<TArgs extends unknown[] = unknown[], TReturn = unknown> = (
    ...args: TArgs
) => Promise<TReturn>;

/**
 * @brief Value or promise
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * @brief Value or array
 */
export type MaybeArray<T> = T | T[];

/**
 * @brief Dictionary type
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * @brief Primitive types
 */
export type Primitive = string | number | boolean | null | undefined;

/**
 * @brief JSON value type
 */
export type JsonValue = 
    | string 
    | number 
    | boolean 
    | null 
    | JsonValue[] 
    | { [key: string]: JsonValue };

/**
 * @brief Extract keys of specific type
 */
export type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * @brief Pick properties by value type
 */
export type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;

/**
 * @brief Omit properties by value type
 */
export type OmitByType<T, U> = Omit<T, KeysOfType<T, U>>;
