/**
 * @file utils.ts
 * @brief Common utility functions
 * @description Provides general-purpose utility functions
 */

/**
 * @brief Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @brief Retry a function with exponential backoff
 */
export async function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number;
        delayMs?: number;
        backoffMultiplier?: number;
        onRetry?: (attempt: number, error: Error) => void;
    } = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        delayMs = 1000,
        backoffMultiplier = 2,
        onRetry,
    } = options;

    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            
            if (attempt === maxAttempts) {
                break;
            }

            if (onRetry) {
                onRetry(attempt, lastError);
            }

            const waitTime = delayMs * Math.pow(backoffMultiplier, attempt - 1);
            await delay(waitTime);
        }
    }

    throw lastError!;
}

/**
 * @brief Deep clone an object
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }

    if (obj instanceof Array) {
        return obj.map(item => deepClone(item)) as T;
    }

    if (obj instanceof Object) {
        const clonedObj = {} as T;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }

    return obj;
}

/**
 * @brief Check if a value is empty
 */
export function isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}

/**
 * @brief Omit properties from an object
 */
export function omit<T extends object, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

/**
 * @brief Pick properties from an object
 */
export function pick<T extends object, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}

/**
 * @brief Chunk an array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * @brief Remove duplicates from an array
 */
export function unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

/**
 * @brief Remove duplicates from an array based on a key function
 */
export function uniqueBy<T>(array: T[], keyFn: (item: T) => unknown): T[] {
    const seen = new Set();
    return array.filter(item => {
        const key = keyFn(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

/**
 * @brief Group array items by a key function
 */
export function groupBy<T>(array: T[], keyFn: (item: T) => string | number): Record<string, T[]> {
    return array.reduce((groups, item) => {
        const key = String(keyFn(item));
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

/**
 * @brief Capitalize first letter of a string
 */
export function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * @brief Convert string to camelCase
 */
export function toCamelCase(str: string): string {
    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
        .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * @brief Convert string to snake_case
 */
export function toSnakeCase(str: string): string {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/[-\s]+/g, '_');
}

/**
 * @brief Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * @brief Generate a random string
 */
export function randomString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}

/**
 * @brief Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json) as T;
    } catch {
        return fallback;
    }
}

/**
 * @brief Create a debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delayMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delayMs);
    };
}

/**
 * @brief Create a throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delayMs: number
): (...args: Parameters<T>) => void {
    let lastRun = 0;
    
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastRun >= delayMs) {
            lastRun = now;
            fn(...args);
        }
    };
}

/**
 * @brief Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * @brief Sleep function (alias for delay)
 */
export const sleep = delay;
