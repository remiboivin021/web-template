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
export class User extends Entity<EntityId> {
    /**
     * @brief User's email address
     * @type {Email}
     */
    private email: Email;

    /**
     * @brief User's username
     * @type {Username}
     */
    private username: Username;

    /**
     * @brief User's hashed password
     * @type {Password}
     */
    private password: Password;

    /**
     * @brief User's role
     * @type {Role}
     */
    private role: Role;

    /**
     * @brief User's connection status
     * @type {ConnectionStatus}
     */
    private connectionStatus: ConnectionStatus;

    /**
     * @brief Private constructor for User entity
     * @param id - Unique identifier value object
     * @param email - User's email value object
     * @param username - User's username value object
     * @param password - Hashed password value object
     * @param role - User's role value object
     * @param createdAt - Creation timestamp
     * @param updatedAt - Last update timestamp
     * @param connectionStatus - Connection status value object
     */
    private constructor(
        id: EntityId,
        email: Email,
        username: Username,
        password: Password,
        role: Role,
        createdAt: Date,
        updatedAt: Date,
        connectionStatus: ConnectionStatus
    ) {
        super(id, createdAt, updatedAt);
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.connectionStatus = connectionStatus;
    }

    /**
     * @brief Factory method to create a new User
     * @param email - User's email
     * @param password - User's password
     * @param username - User's username (optional)
     * @param role - User's role (optional, defaults to 'user')
     * @returns {User} A new User instance
     * @static
     */
    public static create(
        email: Email,
        password: Password,
        username?: Username,
        role?: Role
    ): User {
        const now = new Date();
        return new User(
            EntityId.create(),
            email,
            username || Username.create('guest_' + Date.now()),
            password,
            role || Role.user(),
            now,
            now,
            ConnectionStatus.disconnected()
        );
    }

    /**
     * @brief Factory method to reconstitute a User from persistence
     * @param id - User ID
     * @param email - User's email
     * @param username - User's username
     * @param password - Hashed password
     * @param role - User's role
     * @param createdAt - Creation timestamp
     * @param updatedAt - Last update timestamp
     * @param connectionStatus - Connection status value object
     * @returns {User} A reconstituted User instance
     * @static
     */
    public static reconstitute(
        id: EntityId,
        email: Email,
        username: Username,
        password: Password,
        role: Role,
        createdAt: Date,
        updatedAt: Date,
        connectionStatus: ConnectionStatus = ConnectionStatus.disconnected()
    ): User {
        return new User(
            id,
            email,
            username,
            password,
            role,
            createdAt,
            updatedAt,
            connectionStatus
        );
    }

    /**
     * @brief Gets the user's email
     * @return {Email} User email value object
     */
    public getEmail(): Email {
        return this.email;
    }

    /**
     * @brief Gets the user's username
     * @return {Username} Username value object
     */
    public getUsername(): Username {
        return this.username;
    }

    /**
     * @brief Gets the user's password hash
     * @return {Password} Password value object
     */
    public getPassword(): Password {
        return this.password;
    }

    /**
     * @brief Gets the user's role
     * @return {Role} Role value object
     */
    public getRole(): Role {
        return this.role;
    }

    /**
     * @brief Gets the user's connection status
     * @return {ConnectionStatus} Connection status value object
     */
    public getConnectionStatus(): ConnectionStatus {
        return this.connectionStatus;
    }

    /**
     * @brief Checks if the user is connected
     * @return {boolean} True if user is connected
     */
    public isConnected(): boolean {
        return this.connectionStatus.isConnected();
    }

    /**
     * @brief Marks the user as connected
     * @return {void}
     */
    public connect(): void {
        this.connectionStatus = ConnectionStatus.connected();
        this.touch();
    }

    /**
     * @brief Marks the user as disconnected
     * @return {void}
     */
    public disconnect(): void {
        this.connectionStatus = ConnectionStatus.disconnected();
        this.touch();
    }

    /**
     * @brief Updates the user's email
     * @param {Email} email - New email value object
     * @return {void}
     */
    public setEmail(email: Email): void {
        this.email = email;
        this.touch();
    }

    /**
     * @brief Updates the user's username
     * @param {Username} username - New username value object
     * @return {void}
     */
    public setUsername(username: Username): void {
        this.username = username;
        this.touch();
    }

    /**
     * @brief Updates the user's password
     * @param {Password} password - New hashed password value object
     * @return {void}
     */
    public setPassword(password: Password): void {
        this.password = password;
        this.touch();
    }

    /**
     * @brief Updates the user's role
     * @param {Role} role - New role value object
     * @return {void}
     */
    public setRole(role: Role): void {
        this.role = role;
        this.touch();
    }
}