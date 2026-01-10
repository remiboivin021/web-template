/**
 * @file CreateUserDto.ts
 * @brief Data Transfer Object for creating a new user
 * @description This DTO encapsulates the necessary data to create a user entity.
 * Uses primitive types for easy serialization/deserialization from HTTP requests.
 */

/**
 * @class CreateUserDto
 * @brief Data Transfer Object for creating a new user
 * @property {string} email - User's email address
 * @property {string} password - User's password (plain text, will be hashed by the service)
 * @property {string} [username] - User's username (optional)
 * @property {string} [role] - User's role (optional, defaults to 'user' in service)
 */
export class CreateUserDto {
    email!: string;
    password!: string;
    username?: string;
    role?: string;
}
