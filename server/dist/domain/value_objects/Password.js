"use strict";
/**
 * @file Password.ts
 * @brief Password value object definition
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
/**
 * @class Password
 * @brief Represents a hashed password value object
 * @description This class encapsulates password validation and ensures password integrity
 */
class Password {
    /**
     * @brief Constructor for Password value object
     * @param {string} value - Hashed password string
     * @throws {Error} If password hash is invalid
     */
    constructor(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Password hash cannot be empty');
        }
        this.value = value;
    }
    /**
     * @brief Gets the hashed password value
     * @return {string} The hashed password
     */
    getValue() {
        return this.value;
    }
    /**
     * @brief Compares this password with another
     * @param {Password} other - Another Password value object
     * @return {boolean} True if passwords are equal
     */
    equals(other) {
        return this.value === other.value;
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map