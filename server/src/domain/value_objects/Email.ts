/**
 * @file Email.ts
 * @brief Email value object implementation
 * @description Represents an immutable email address value object in the domain model.
 * This value object ensures email validity and provides value-based equality.
 */

/**
 * @class Email
 * @brief Immutable email address value object
 * @description Represents a validated email address following domain-driven design principles.
 * Ensures immutability and value-based equality for email addresses.
 */
export class Email {
    private readonly value: string;

    /**
     * @brief Private constructor to create an Email instance
     * @param value The validated email address string
     * @private
     */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * @brief Factory method to create an Email value object
     * @param email The email string to validate and wrap
     * @returns A new Email instance
     * @throws Error if the email format is invalid
     * @static
     */
    public static create(email: string): Email {
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
    private static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }

    /**
     * @brief Gets the email value
     * @returns The email address as a string
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Checks equality with another Email value object
     * @param other The other Email instance to compare
     * @returns True if both emails have the same value, false otherwise
     */
    public equals(other: Email): boolean {
        if (!(other instanceof Email)) {
            return false;
        }
        return this.value === other.value;
    }

    /**
     * @brief Returns string representation of the email
     * @returns The email address as a string
     */
    public toString(): string {
        return this.value;
    }
}