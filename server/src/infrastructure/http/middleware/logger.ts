/**
 * @file logger.ts
 * @brief HTTP request logging middleware
 * @description Logs incoming HTTP requests and their responses
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @function logger
 * @brief Express middleware for logging HTTP requests
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export function logger(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    // Log when response finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage = [
            `[${new Date().toISOString()}]`,
            req.method,
            req.path,
            res.statusCode,
            `${duration}ms`,
        ].join(' ');

        if (res.statusCode >= 400) {
            console.error(logMessage);
        } else {
            console.log(logMessage);
        }
    });

    next();
}
