/**
 * @file UpdateUserDto.ts
 * @brief Data Transfer Object for updating user information
 * @description This DTO encapsulates the data required to update a user entity.
 * All properties are optional since partial updates are supported.
 * Uses primitive types for easy serialization/deserialization from HTTP requests.
 */

/**
 * @class UpdateUserDto
 * @brief Data Transfer Object for updating user information
 * @property {string} [username] - User's username (optional)
 * @property {string} [email] - User's email address (optional)
 * @property {string} [password] - User's new password (optional, will be hashed by the service)
 * @property {string} [role] - User's role (optional)
 * @property {boolean} [isActive] - User's active status (optional)
 */
export class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    isActive?: boolean;
}
