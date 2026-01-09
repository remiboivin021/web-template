/**
 * @file UserController.ts
 * @brief User controller handling HTTP requests
 */
import { Request, Response } from "express";
import { BaseController } from "./BaseController";
export declare class UserController extends BaseController {
    /**
     * @brief Get all users
     */
    getAllUsers(req: Request, res: Response): Promise<Response>;
    /**
     * @brief Get user by ID
     */
    getUserById(req: Request, res: Response): Promise<Response>;
    /**
     * @brief Create new user
     */
    createUser(req: Request, res: Response): Promise<Response>;
    /**
     * @brief Update user
     */
    updateUser(req: Request, res: Response): Promise<Response>;
    /**
     * @brief Delete user
     */
    deleteUser(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=UserController.d.ts.map