/**
 * @file userRoutes.ts
 * @brief Routes configuration for user endpoints
 * @description Defines HTTP routes for user CRUD operations
 */

import { Router } from 'express';
import { container } from 'tsyringe';
import { validateBody, validateCreateUser, validateUpdateUser } from '../middleware/validation';
import { UserController } from '../controllers/UserController';

/**
 * @function createUserRoutes
 * @brief Factory function to create user routes after DI container is initialized
 * @returns {Router} Express router with user routes configured
 */
export function createUserRoutes(): Router {
    const router = Router();
    const userController = container.resolve(UserController);

    /**
     * @route GET /api/users
     * @desc Get all users
     * @access Public (TODO: Add authentication)
     */
    router.get('/', (req, res, next) => userController.getAll(req, res, next));

    /**
     * @route GET /api/users/:id
     * @desc Get user by ID
     * @access Public (TODO: Add authentication)
     */
    router.get('/:id', (req, res, next) => userController.getById(req, res, next));

    /**
     * @route POST /api/users
     * @desc Create new user
     * @access Public (TODO: Add authentication)
     */
    router.post('/', validateBody(validateCreateUser), (req, res, next) => userController.create(req, res, next));

    /**
     * @route PUT /api/users/:id
     * @desc Update user
     * @access Public (TODO: Add authentication)
     */
    router.put('/:id', validateBody(validateUpdateUser), (req, res, next) => userController.update(req, res, next));

    /**
     * @route DELETE /api/users/:id
     * @desc Delete user
     * @access Public (TODO: Add authentication)
     */
    router.delete('/:id', (req, res, next) => userController.delete(req, res, next));

    return router;
}
