/**
 * @file UserController.ts
 * @brief HTTP controller for user-related endpoints
 * @description Handles HTTP requests for user CRUD operations
 */

import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../../../application/services/UserService';
import { CreateUserDto } from '../../../application/dto/CreateUserDto';
import { UpdateUserDto } from '../../../application/dto/UpdateUserDto';
import { UserResponseDto } from '../../../application/dto/UserResponseDto';
import { EntityId } from '../../../domain/value_objects/EntityId';
import { Email } from '../../../domain/value_objects/Email';
import { Username } from '../../../domain/value_objects/Username';
import { Password } from '../../../domain/value_objects/Password';
import { Role } from '../../../domain/value_objects/Role';
import { User } from '../../../domain/entities/User';
import { NotFoundError } from '../middleware/errorHandler';
import { injectable } from 'tsyringe';

/**
 * @class UserController
 * @brief Controller for user HTTP endpoints
 */
@injectable()
export class UserController {
    private userService: UserService;

    /**
     * @brief Constructs UserController with injected service
     */
    constructor() {
        this.userService = container.resolve(UserService);
    }

    /**
     * @brief Maps User entity to UserResponseDto
     * @param user - User entity
     * @returns UserResponseDto
     * @private
     */
    private toResponseDto(user: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.getId().getValue();
        dto.email = user.getEmail().getValue();
        dto.username = user.getUsername().getValue();
        dto.role = user.getRole().getValue();
        dto.connectionStatus = user.getConnectionStatus().isConnected() ? 'connected' : 'disconnected';
        dto.createdAt = user.getCreatedAt();
        dto.updatedAt = user.getUpdatedAt();
        return dto;
    }

    /**
     * @brief GET /api/users/:id - Get user by ID
     */
    public getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = EntityId.create(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                throw new NotFoundError('User not found');
            }

            res.json({
                success: true,
                data: this.toResponseDto(user),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @brief GET /api/users - Get all users
     */
    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();

            res.json({
                success: true,
                data: users.map((user) => this.toResponseDto(user)),
                count: users.length,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @brief POST /api/users - Create new user
     */
    public create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const dto: CreateUserDto = req.body;

            // Convert DTO to domain entity
            const user = User.create(
                Email.create(dto.email),
                Password.create(dto.password),
                dto.username ? Username.create(dto.username) : undefined,
                dto.role ? Role.create(dto.role) : undefined
            );

            await this.userService.createUser(user);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: this.toResponseDto(user),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @brief PUT /api/users/:id - Update user
     */
    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = EntityId.create(req.params.id);
            const dto: UpdateUserDto = req.body;

            const user = await this.userService.getUserById(id);
            if (!user) {
                throw new NotFoundError('User not found');
            }

            // Update user properties
            if (dto.email) {
                user.setEmail(Email.create(dto.email));
            }
            if (dto.username) {
                user.setUsername(Username.create(dto.username));
            }
            if (dto.password) {
                user.setPassword(Password.create(dto.password));
            }
            if (dto.role) {
                user.setRole(Role.create(dto.role));
            }

            await this.userService.updateUser(user);

            res.json({
                success: true,
                message: 'User updated successfully',
                data: this.toResponseDto(user),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * @brief DELETE /api/users/:id - Delete user
     */
    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = EntityId.create(req.params.id);
            
            const user = await this.userService.getUserById(id);
            if (!user) {
                throw new NotFoundError('User not found');
            }

            await this.userService.deleteUser(id);

            res.json({
                success: true,
                message: 'User deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    };
}
