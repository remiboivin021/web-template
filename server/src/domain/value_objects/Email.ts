/**
 * @file Email.ts
 * @brief Email value object definition
 */

/**
 * @class Email
 * @brief Represents an email address value object
 * @description Encapsulates email validation and business rules
 */
export class Email {
    private readonly value: string;

    /**
     * @brief Private constructor for Email value object
     * @param {string} value - The email string
     */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * @brief Factory method to create an Email value object
     * @param {string} email - Email address to validate and create
     * @throws {Error} If email is invalid
     * @return {Email} New Email instance
     * @static
     */
    public static create(email: string): Email {
        Email.validate(email);
        return new Email(email.toLowerCase().trim());
    }

    /**
     * @brief Validates the email address
     * @param {string} email - Email to validate
     * @throws {Error} If email is invalid
     * @return {void}
     * @private
     * @static
     */
    private static validate(email: string): void {
        if (!email || email.trim().length === 0) {
            throw new Error('Email cannot be empty');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        if (email.length > 254) {
            throw new Error('Email address is too long');
        }
    }

    /**
     * @brief Gets the email value
     * @return {string} Email string
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Compares two Email objects
     * @param {Email} other - Other email to compare
     * @return {boolean} True if emails are equal
     */
    public equals(other: Email): boolean {
        return other instanceof Email && this.value === other.value;
    }

    /**
     * @brief Returns string representation of the email
     * @return {string} Email address
     */
    public toString(): string {
        return this.value;
    }
}