/**
 * @file Password.ts
 * @brief Password value object definition
 */

/**
 * @class Password
 * @brief Represents a hashed password value object
 * @description This class encapsulates password validation and ensures password integrity
 */
export class Password {
    /**
     * @brief The hashed password value
     * @type {string}
     */
    private readonly value: string;

    /**
     * @brief Constructor for Password value object
     * @param {string} value - Hashed password string
     * @throws {Error} If password hash is invalid
     */
    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Password hash cannot be empty');
        }
        this.value = value;
    }

    /**
     * @brief Factory method to create a Password value object
     * @param {string} password - Password (plain or hashed)
     * @returns {Password} New Password instance
     * @static
     * @todo Add password hashing logic
     */
    public static create(password: string): Password {
        // TODO: Hash the password before storing
        // For now, storing as-is (NOT SECURE FOR PRODUCTION)
        return new Password(password);
    }

    /**
     * @brief Factory method to create a Password from an already hashed value
     * @param {string} hashedPassword - Already hashed password string
     * @returns {Password} New Password instance
     * @static
     */
    public static createFromHash(hashedPassword: string): Password {
        return new Password(hashedPassword);
    }

    /**
     * @brief Gets the hashed password value
     * @return {string} The hashed password
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Compares this password with another
     * @param {Password} other - Another Password value object
     * @return {boolean} True if passwords are equal
     */
    public equals(other: Password): boolean {
        return this.value === other.value;
    }
}