/**
 * @file ConnectionStatus.ts
 * @brief ConnectionStatus value object definition
 */
/**
 * @class ConnectionStatus
 * @brief Represents a user's connection status
 */
export declare class ConnectionStatus {
    private readonly status;
    /**
     * @brief Private constructor for ConnectionStatus
     * @param {boolean} status - Connection status (true = connected, false = disconnected)
     */
    private constructor();
    /**
     * @brief Creates a connected status
     * @return {ConnectionStatus} New connected status instance
     */
    static connected(): ConnectionStatus;
    /**
     * @brief Creates a disconnected status
     * @return {ConnectionStatus} New disconnected status instance
     */
    static disconnected(): ConnectionStatus;
    /**
     * @brief Gets the status value
     * @return {boolean} Status value
     */
    getValue(): boolean;
    /**
     * @brief Checks if user is connected
     * @return {boolean} True if connected
     */
    isConnected(): boolean;
    /**
     * @brief Checks equality with another ConnectionStatus
     * @param {ConnectionStatus} other - Other status to compare
     * @return {boolean} True if equal
     */
    equals(other: ConnectionStatus): boolean;
}
//# sourceMappingURL=ConnectionStatus.d.ts.map