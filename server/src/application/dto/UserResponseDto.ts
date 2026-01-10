/**
 * @file UserResponseDto.ts
 * @brief Data Transfer Object for user responses
 * @description This DTO encapsulates the data sent back to clients when
 * retrieving user information. It excludes sensitive data like passwords.
 * Uses primitive types for easy serialization to JSON.
 */

/**
 * @class UserResponseDto
 * @brief Data Transfer Object for user responses
 * @property {string} id - Unique identifier of the user
 * @property {string} email - User's email address
 * @property {string} [username] - User's username (optional)
 * @property {string} role - User's role
 * @property {string} connectionStatus - User's connection status
 * @property {Date} createdAt - Timestamp of when the user was created
 * @property {Date} updatedAt - Timestamp of the last update to the user
 */
export class UserResponseDto {
    id!: string;
    email!: string;
    username?: string;
    role!: string;
    connectionStatus!: string;
    createdAt!: Date;
    updatedAt!: Date;
}
