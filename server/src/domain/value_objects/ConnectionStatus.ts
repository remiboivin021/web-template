/**
 * @file ConnectionStatus.ts
 * @brief ConnectionStatus value object definition
 */

/**
 * @class ConnectionStatus
 * @brief Represents a user's connection status
 */
export class ConnectionStatus {
    private readonly status: string;
    
    private static readonly VALID_STATUSES = ['online', 'offline', 'away', 'busy'] as const;

    /**
     * @brief Private constructor for ConnectionStatus
     * @param {string} status - Connection status
     */
    private constructor(status: string) {
        this.status = status;
    }

    /**
     * @brief Creates a ConnectionStatus from a string
     * @param {string} status - Status string
     * @return {ConnectionStatus} New status instance
     */
    public static create(status: string): ConnectionStatus {
        const normalizedStatus = status.toLowerCase();
        if (!ConnectionStatus.VALID_STATUSES.includes(normalizedStatus as any)) {
            throw new Error(`Invalid connection status: ${status}`);
        }
        return new ConnectionStatus(normalizedStatus);
    }

    /**
     * @brief Creates an online status
     * @return {ConnectionStatus} New online status instance
     */
    public static online(): ConnectionStatus {
        return new ConnectionStatus('online');
    }

    /**
     * @brief Creates an offline status
     * @return {ConnectionStatus} New offline status instance
     */
    public static offline(): ConnectionStatus {
        return new ConnectionStatus('offline');
    }

    /**
     * @brief Creates a disconnected status (alias for offline)
     * @return {ConnectionStatus} New disconnected status instance
     */
    public static disconnected(): ConnectionStatus {
        return new ConnectionStatus('offline');
    }

    /**
     * @brief Creates a connected status (alias for online)
     * @return {ConnectionStatus} New connected status instance
     */
    public static connected(): ConnectionStatus {
        return new ConnectionStatus('online');
    }

    /**
     * @brief Creates an away status
     * @return {ConnectionStatus} New away status instance
     */
    public static away(): ConnectionStatus {
        return new ConnectionStatus('away');
    }

    /**
     * @brief Creates a busy status
     * @return {ConnectionStatus} New busy status instance
     */
    public static busy(): ConnectionStatus {
        return new ConnectionStatus('busy');
    }

    /**
     * @brief Gets the status value
     * @return {string} Status value
     */
    public getValue(): string {
        return this.status;
    }

    /**
     * @brief Checks if user is connected/online
     * @return {boolean} True if online
     */
    public isConnected(): boolean {
        return this.status === 'online';
    }

    /**
     * @brief Checks if user is offline
     * @return {boolean} True if offline
     */
    public isOffline(): boolean {
        return this.status === 'offline';
    }

    /**
     * @brief Checks equality with another ConnectionStatus
     * @param {ConnectionStatus} other - Other status to compare
     * @return {boolean} True if equal
     */
    public equals(other: ConnectionStatus): boolean {
        return this.status === other.status;
    }

    /**
     * @brief Convert to string
     * @return {string} Status as string
     */
    public toString(): string {
        return this.status;
    }
}