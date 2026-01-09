/**
 * @file ConnectionStatus.ts
 * @brief ConnectionStatus value object definition
 */

/**
 * @class ConnectionStatus
 * @brief Represents a user's connection status
 */
export class ConnectionStatus {
    private readonly status: boolean;

    /**
     * @brief Private constructor for ConnectionStatus
     * @param {boolean} status - Connection status (true = connected, false = disconnected)
     */
    private constructor(status: boolean) {
        this.status = status;
    }

    /**
     * @brief Creates a connected status
     * @return {ConnectionStatus} New connected status instance
     */
    public static connected(): ConnectionStatus {
        return new ConnectionStatus(true);
    }

    /**
     * @brief Creates a disconnected status
     * @return {ConnectionStatus} New disconnected status instance
     */
    public static disconnected(): ConnectionStatus {
        return new ConnectionStatus(false);
    }

    /**
     * @brief Gets the status value
     * @return {boolean} Status value
     */
    public getValue(): boolean {
        return this.status;
    }

    /**
     * @brief Checks if user is connected
     * @return {boolean} True if connected
     */
    public isConnected(): boolean {
        return this.status;
    }

    /**
     * @brief Checks equality with another ConnectionStatus
     * @param {ConnectionStatus} other - Other status to compare
     * @return {boolean} True if equal
     */
    public equals(other: ConnectionStatus): boolean {
        return this.status === other.status;
    }
}