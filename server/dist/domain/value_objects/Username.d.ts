/**
 * @file Username.ts
 * @brief Username value object definition
 */
/**
 * @class Username
 * @brief Represents a username value object
 * @description Encapsulates username validation and business rules
 */
export declare class Username {
    private readonly value;
    /**
     * @brief Constructor for Username value object
     * @param {string} value - The username string
     * @throws {Error} If username is invalid
     */
    constructor(value: string);
    /**
     * @brief Validates the username
     * @param {string} value - Username to validate
     * @throws {Error} If username is invalid
     * @return {void}
     */
    private validate;
    /**
     * @brief Gets the username value
     * @return {string} Username string
     */
    getValue(): string;
    /**
     * @brief Compares two Username objects
     * @param {Username} other - Other username to compare
     * @return {boolean} True if usernames are equal
     */
    equals(other: Username): boolean;
}
//# sourceMappingURL=Username.d.ts.map