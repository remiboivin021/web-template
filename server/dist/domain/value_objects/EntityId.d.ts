/**
 * @file EntityId.ts
 * @brief Base identifier value object
 * @description Abstract base class for all identifier value objects in the domain.
 * Provides common functionality for ID validation, generation, and comparison.
 */
/**
 * @class EntityId
 * @brief Abstract base class for identifier value objects
 * @description Implements common identifier behavior including UUID validation and equality.
 * All specific ID types should extend this class.
 */
export declare abstract class EntityId {
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
    protected constructor(value: string);
    /**
     * @brief Validates the identifier format
     * @param id The identifier string to validate
     * @returns {boolean} True if the ID is a valid UUID v4, false otherwise
     * @static
     * @protected
     */
    protected static isValid(id: string): boolean;
    /**
     * @brief Generates a new UUID v4
     * @returns {string} A new UUID string
     * @static
     * @protected
     */
    protected static generateId(): string;
    /**
     * @brief Gets the string value of the identifier
     * @returns {string} The identifier value
     */
    getValue(): string;
    /**
     * @brief Checks equality with another identifier
     * @param other The identifier to compare with
     * @returns {boolean} True if both identifiers have the same value
     */
    equals(other: EntityId): boolean;
    /**
     * @brief Returns the string representation of the identifier
     * @returns {string} The identifier value
     */
    toString(): string;
}
//# sourceMappingURL=EntityId.d.ts.map