"use strict";
/**
 * @file User.ts
 * @brief User entity definition
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Entity_1 = require("./Entity");
const ConnectionStatus_1 = require("../value_objects/ConnectionStatus");
/**
 * @class User
 * @brief Represents a user entity in the system
 * @description This class encapsulates all user-related data and properties
* @extends Entity<EntityId>
 */
class User extends Entity_1.Entity {
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
    constructor(id, email, username, password, role, createdAt, updatedAt, connectionStatus) {
        super(id, createdAt, updatedAt);
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.connectionStatus = connectionStatus || ConnectionStatus_1.ConnectionStatus.disconnected();
    }
    /**
     * @brief Gets the user's email
     * @return {Email} User email value object
     */
    getEmail() {
        return this.email;
    }
    /**
     * @brief Gets the user's username
     * @return {Username} Username value object
     */
    getUsername() {
        return this.username;
    }
    /**
     * @brief Gets the user's password hash
     * @return {Password} Password value object
     */
    getPassword() {
        return this.password;
    }
    /**
     * @brief Gets the user's role
     * @return {Role} Role value object
     */
    getRole() {
        return this.role;
    }
    /**
     * @brief Gets the user's connection status
     * @return {ConnectionStatus} Connection status value object
     */
    getConnectionStatus() {
        return this.connectionStatus;
    }
    /**
     * @brief Checks if the user is connected
     * @return {boolean} True if user is connected
     */
    isConnected() {
        return this.connectionStatus.isConnected();
    }
    /**
     * @brief Marks the user as connected
     * @return {void}
     */
    connect() {
        this.connectionStatus = ConnectionStatus_1.ConnectionStatus.connected(new Date());
    }
    /**
     * @brief Marks the user as disconnected
     * @return {void}
     */
    disconnect() {
        this.connectionStatus = ConnectionStatus_1.ConnectionStatus.disconnected();
    }
    /**
     * @brief Updates the user's email
     * @param {Email} email - New email value object
     * @return {void}
     */
    setEmail(email) {
        this.email = email;
        this.setUpdatedAt();
    }
    /**
     * @brief Updates the user's username
     * @param {Username} username - New username value object
     * @return {void}
     */
    setUsername(username) {
        this.username = username;
        this.setUpdatedAt();
    }
    /**
     * @brief Updates the user's password
     * @param {Password} password - New hashed password value object
     * @return {void}
     */
    setPassword(password) {
        this.password = password;
        this.setUpdatedAt();
    }
    /**
     * @brief Updates the user's role
     * @param {Role} role - New role value object
     * @return {void}
     */
    setRole(role) {
        this.role = role;
        this.setUpdatedAt();
    }
    /**
     * Converts entity to plain object for serialization
     *
     * @returns {Object} Plain object representation
     */
    toObject() {
        return {
            ...super.toObject(),
            email: this.email.getValue(),
            username: this.username.getValue(),
            role: this.role.getValue(),
            connectionStatus: this.connectionStatus.getValue()
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map