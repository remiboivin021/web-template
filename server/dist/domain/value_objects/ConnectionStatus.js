"use strict";
/**
 * @file ConnectionStatus.ts
 * @brief ConnectionStatus value object definition
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStatus = void 0;
/**
 * @class ConnectionStatus
 * @brief Represents a user's connection status
 */
class ConnectionStatus {
    /**
     * @brief Private constructor for ConnectionStatus
     * @param {boolean} status - Connection status (true = connected, false = disconnected)
     */
    constructor(status) {
        this.status = status;
    }
    /**
     * @brief Creates a connected status
     * @return {ConnectionStatus} New connected status instance
     */
    static connected() {
        return new ConnectionStatus(true);
    }
    /**
     * @brief Creates a disconnected status
     * @return {ConnectionStatus} New disconnected status instance
     */
    static disconnected() {
        return new ConnectionStatus(false);
    }
    /**
     * @brief Gets the status value
     * @return {boolean} Status value
     */
    getValue() {
        return this.status;
    }
    /**
     * @brief Checks if user is connected
     * @return {boolean} True if connected
     */
    isConnected() {
        return this.status;
    }
    /**
     * @brief Checks equality with another ConnectionStatus
     * @param {ConnectionStatus} other - Other status to compare
     * @return {boolean} True if equal
     */
    equals(other) {
        return this.status === other.status;
    }
}
exports.ConnectionStatus = ConnectionStatus;
//# sourceMappingURL=ConnectionStatus.js.map