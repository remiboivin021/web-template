/**
 * @file BaseController.ts
 * @brief Base controller with common functionality
 */
import { Response } from "express";
export declare abstract class BaseController {
    protected ok<T>(res: Response, data?: T): Response;
    protected created<T>(res: Response, data?: T): Response;
    protected badRequest(res: Response, message?: string): Response;
    protected notFound(res: Response, message?: string): Response;
    protected fail(res: Response, error: Error | string): Response;
}
//# sourceMappingURL=BaseController.d.ts.map