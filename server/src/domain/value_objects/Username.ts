/**
 * @file Username.ts
 * @brief Username value object definition
 */

/**
 * @class Username
 * @brief Represents a username value object
 * @description Encapsulates username validation and business rules
 */
export class Username {
    private readonly value: string;

    /**
     * @brief Constructor for Username value object
     * @param {string} value - The username string
     * @throws {Error} If username is invalid
     */
    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    /**
     * @brief Factory method to create a Username value object
     * @param {string} username - Username to create
     * @returns {Username} New Username instance
     * @static
     */
    public static create(username: string): Username {
        return new Username(username);
    }

    /**
     * @brief Validates the username
     * @param {string} value - Username to validate
     * @throws {Error} If username is invalid
     * @return {void}
     */
    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('Username cannot be empty');
        }
        if (value.length < 3 || value.length > 30) {
            throw new Error('Username must be between 3 and 30 characters');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            throw new Error('Username can only contain letters, numbers, and underscores');
        }
    }

    /**
     * @brief Gets the username value
     * @return {string} Username string
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Compares two Username objects
     * @param {Username} other - Other username to compare
     * @return {boolean} True if usernames are equal
     */
    public equals(other: Username): boolean {
        return this.value === other.value;
    }
}