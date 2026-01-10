/**
 * @file EntityId.ts
 * @brief Value object representing a unique entity identifier
 */

/**
 * @class EntityId
 * @brief Represents a unique identifier for domain entities
 * @description Immutable value object that encapsulates an entity's unique identifier.
 * Ensures type safety and provides equality comparison methods.
 */
export class EntityId {
    private readonly value: string;

    /**
     * @brief Constructs a new EntityId
     * @param value The string value of the identifier
     * @throws Error if the value is empty or invalid
     */
    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('EntityId cannot be empty');
        }
        this.value = value;
    }

    /**
     * @brief Factory method to create a new EntityId with generated UUID
     * @param value - Optional ID value. If not provided, generates a new UUID
     * @returns A new EntityId instance
     * @static
     */
    public static create(value?: string): EntityId {
        return new EntityId(value || crypto.randomUUID());
    }

    /**
     * @brief Gets the string value of the identifier
     * @returns The identifier value as a string
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @brief Checks equality with another EntityId
     * @param other The EntityId to compare with
     * @returns True if both EntityIds have the same value, false otherwise
     */
    public equals(other: EntityId): boolean {
        if (!other) {
            return false;
        }
        return this.value === other.value;
    }

    /**
     * @brief Returns the string representation of the EntityId
     * @returns The identifier value as a string
     */
    public toString(): string {
        return this.value;
    }
}