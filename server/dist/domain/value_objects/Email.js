"use strict";
/**
 * @file Email.ts
 * @brief Email value object implementation
 * @description Represents an immutable email address value object in the domain model.
 * This value object ensures email validity and provides value-based equality.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
/**
 * @class Email
 * @brief Immutable email address value object
 * @description Represents a validated email address following domain-driven design principles.
 * Ensures immutability and value-based equality for email addresses.
 */
class Email {
    /**
     * @brief Private constructor to create an Email instance
     * @param value The validated email address string
     * @private
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * @brief Factory method to create an Email value object
     * @param email The email string to validate and wrap
     * @returns A new Email instance
     * @throws Error if the email format is invalid
     * @static
     */
    static create(email) {
        if (!Email.isValid(email)) {
            throw new Error(`Invalid email format: ${email}`);
        }
        return new Email(email.toLowerCase().trim());
    }
    /**
     * @brief Validates email format
     * @param email The email string to validate
     * @returns True if the email format is valid, false otherwise
     * @static
     */
    static isValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }
    /**
     * @brief Gets the email value
     * @returns The email address as a string
     */
    getValue() {
        return this.value;
    }
    /**
     * @brief Checks equality with another Email value object
     * @param other The other Email instance to compare
     * @returns True if both emails have the same value, false otherwise
     */
    equals(other) {
        if (!(other instanceof Email)) {
            return false;
        }
        return this.value === other.value;
    }
    /**
     * @brief Returns string representation of the email
     * @returns The email address as a string
     */
    toString() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map