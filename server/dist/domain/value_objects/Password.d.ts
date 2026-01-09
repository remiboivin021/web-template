/**
 * @file Password.ts
 * @brief Password value object definition
 */
/**
 * @class Password
 * @brief Represents a hashed password value object
 * @description This class encapsulates password validation and ensures password integrity
 */
export declare class Password {
    /**
     * @brief The hashed password value
     * @type {string}
     */
    private readonly value;
    /**
     * @brief Constructor for Password value object
     * @param {string} value - Hashed password string
     * @throws {Error} If password hash is invalid
     */
    constructor(value: string);
    /**
     * @brief Gets the hashed password value
     * @return {string} The hashed password
     */
    getValue(): string;
    /**
     * @brief Compares this password with another
     * @param {Password} other - Another Password value object
     * @return {boolean} True if passwords are equal
     */
    equals(other: Password): boolean;
}
//# sourceMappingURL=Password.d.ts.map