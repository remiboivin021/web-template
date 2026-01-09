/**
 * @file User.ts
 * @brief User entity definition
 */
import { Entity } from './Entity';
import { EntityId } from '../value_objects/EntityId';
import { Email } from '../value_objects/Email';
import { Username } from '../value_objects/Username';
import { Password } from '../value_objects/Password';
import { Role } from '../value_objects/Role';
import { ConnectionStatus } from '../value_objects/ConnectionStatus';
/**
 * @class User
 * @brief Represents a user entity in the system
 * @description This class encapsulates all user-related data and properties
* @extends Entity<EntityId>
 */
export declare class User extends Entity<EntityId> {
    /**
     * @brief Unique identifier for the user
    * @type {EntityId}
     */
    /**
     * @brief User's email address
     * @type {Email}
     */
    private email;
    /**
     * @brief User's username
     * @type {Username}
     */
    private username;
    /**
     * @brief User's hashed password
     * @type {Password}
     */
    private password;
    /**
     * @brief User's role
     * @type {Role}
     */
    private role;
    /**
     * @brief User's connection status
     * @type {ConnectionStatus}
     */
    private connectionStatus;
    /**
     * @brief Constructor for User entity
    * @param {EntityId} id - Unique identifier value object
     * @param {Email} email - User's email value object
     * @param {Username} username - User's username value object
     * @param {Password} password - Hashed password value object
     * @param {Role} role - User's role value object
     * @param {Date} createdAt - Creation timestamp
     * @param {Date} updatedAt - Last update timestamp
     */
    constructor(id: EntityId, email: Email, username: Username, password: Password, role: Role, createdAt: Date, updatedAt: Date, connectionStatus?: ConnectionStatus);
    /**
     * @brief Gets the user's email
     * @return {Email} User email value object
     */
    getEmail(): Email;
    /**
     * @brief Gets the user's username
     * @return {Username} Username value object
     */
    getUsername(): Username;
    /**
     * @brief Gets the user's password hash
     * @return {Password} Password value object
     */
    getPassword(): Password;
    /**
     * @brief Gets the user's role
     * @return {Role} Role value object
     */
    getRole(): Role;
    /**
     * @brief Gets the user's connection status
     * @return {ConnectionStatus} Connection status value object
     */
    getConnectionStatus(): ConnectionStatus;
    /**
     * @brief Checks if the user is connected
     * @return {boolean} True if user is connected
     */
    isConnected(): boolean;
    /**
     * @brief Marks the user as connected
     * @return {void}
     */
    connect(): void;
    /**
     * @brief Marks the user as disconnected
     * @return {void}
     */
    disconnect(): void;
    /**
     * @brief Updates the user's email
     * @param {Email} email - New email value object
     * @return {void}
     */
    setEmail(email: Email): void;
    /**
     * @brief Updates the user's username
     * @param {Username} username - New username value object
     * @return {void}
     */
    setUsername(username: Username): void;
    /**
     * @brief Updates the user's password
     * @param {Password} password - New hashed password value object
     * @return {void}
     */
    setPassword(password: Password): void;
    /**
     * @brief Updates the user's role
     * @param {Role} role - New role value object
     * @return {void}
     */
    setRole(role: Role): void;
    /**
     * Converts entity to plain object for serialization
     *
     * @returns {Object} Plain object representation
     */
    toObject(): {
        id: string;
        email: string;
        username: string;
        role: string;
        connectionStatus: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}
//# sourceMappingURL=User.d.ts.map