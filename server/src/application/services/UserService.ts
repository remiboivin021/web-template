import { inject, injectable } from "tsyringe";
import { TYPES } from "../../infrastructure/di/types";
import { IUserRepository } from "../../application/ports/outbound/IUserRepository";
import { User } from "../../domain/entities/User";
import { EntityId } from "../../domain/value_objects/EntityId";

/**
 * @class UserService
 * @brief Application service for user-related operations
 * @description Provides business logic layer for user management operations.
 * Acts as an intermediary between the application layer and the domain layer,
 * coordinating user-related use cases and enforcing business rules.
 */

@injectable()
export class UserService {
    /**
     * @brief Constructs a new UserService instance
     * @param {IUserRepository} userRepository - Repository for user persistence operations
     * @description Injects the user repository dependency for data access
     */
    constructor(
        @inject(TYPES.IUserRepository)
        private readonly userRepository: IUserRepository
    ) {}

    /**
     * @brief Retrieves a user by their unique identifier
     * @param {EntityId} id - The unique identifier of the user to retrieve
     * @returns {Promise<User | null>} Promise resolving to the User entity if found, null otherwise
     * @description Delegates to the repository to find and return a user by ID
     */
    async getUserById(id: EntityId): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    /**
     * @brief Retrieves a user by their email address
     * @param {string} email - The email address of the user to retrieve
     * @returns {Promise<User | null>} Promise resolving to the User entity if found, null otherwise
     * @description Delegates to the repository to find and return a user by email
     */
    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    /**
     * @brief Retrieves all users from the system
     * @returns {Promise<User[]>} Promise resolving to an array of all User entities
     * @description Delegates to the repository to find and return all users
     */
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    /**
     * @brief Creates a new user in the system
     * @param {User} user - The user entity to create
     * @returns {Promise<void>} Promise that resolves when the user is successfully created
     * @throws {Error} If validation fails or user already exists
     * @description Validates business rules and persists a new user entity
     * @todo Add business logic validation before saving
     */
    async createUser(user: User): Promise<void> {
        // Add business logic validation here
        await this.userRepository.save(user);
    }

    /**
     * @brief Updates an existing user's information
     * @param {User} user - The user entity with updated information
     * @returns {Promise<void>} Promise that resolves when the user is successfully updated
     * @throws {Error} If validation fails or user does not exist
     * @description Validates business rules and persists changes to an existing user
     * @todo Add business logic validation before updating
     */
    async updateUser(user: User): Promise<void> {
        // Add business logic validation here
        await this.userRepository.update(user);
    }

    /**
     * @brief Deletes a user from the system
     * @param {EntityId} id - The unique identifier of the user to delete
     * @returns {Promise<void>} Promise that resolves when the user is successfully deleted
     * @throws {Error} If user does not exist or deletion is not allowed
     * @description Removes a user entity from persistence
     */
    async deleteUser(id: EntityId): Promise<void> {
        await this.userRepository.delete(id);
    }
}