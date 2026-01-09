/**
 * @file EntityId.ts
 * @brief Base identifier value object
 * @description Abstract base class for all identifier value objects in the domain.
 * Provides common functionality for ID validation, generation, and comparison.
 */

import { randomUUID } from 'crypto';

/**
 * @class EntityId
 * @brief Abstract base class for identifier value objects
 * @description Implements common identifier behavior including UUID validation and equality.
 * All specific ID types should extend this class.
 */
export abstract class EntityId {
    /**
     * @brief The string representation of the identifier
     * @protected
     */
    protected readonly value: string;

    /**
     * @brief Protected constructor to create a EntityId instance
     * @param value The string representation of the identifier
     * @throws {Error} If the provided value is invalid
     * @protected
     */
    protected constructor(value: string) {
        if (!EntityId.isValid(value)) {
            throw new Error(`Invalid ${this.constructor.name}: ${value}`);
        }
        this.value = value;
    }

    /**
     * @brief Validates the identifier format
     * @param id The identifier string to validate
     * @returns {boolean} True if the ID is a valid UUID v4, false otherwise
     * @static
     * @protected
     */
    protected static isValid(id: string): boolean {
        if (!id || id.trim().length === 0) {
            return false;
        }
        // UUID v4 format validation
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }

    /**
     * @brief Generates a new UUID v4
     * @returns {string} A new UUID string
     * @static
     * @protected
     */
    protected static generateId(): string {
        return randomUUID();
    }

    /**
     * @brief Gets the string value of the identifier
     * @returns {string} The identifier value
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Checks equality with another identifier
     * @param other The identifier to compare with
     * @returns {boolean} True if both identifiers have the same value
     */
    public equals(other: EntityId): boolean {
        if (!(other instanceof EntityId)) {
            return false;
        }
        return this.value === other.value;
    }

    /**
     * @brief Returns the string representation of the identifier
     * @returns {string} The identifier value
     */
    public toString(): string {
        return this.value;
    }
}