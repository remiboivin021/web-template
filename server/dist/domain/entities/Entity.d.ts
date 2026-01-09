/**
 * @file Entity.ts
 * @brief Base entity class for domain entities
 * @description Abstract base class that provides common functionality for all domain entities.
 * Implements entity identity and equality based on unique identifiers.
 */
/**
 * @class Entity
 * @brief Abstract base class for all domain entities
 * @description Provides common entity behavior including identity management and equality comparison.
 * Entities are distinguished by their unique identifier rather than their attributes.
 * @template EntityId The type of the entity's unique identifier
 */
export declare abstract class Entity<EntityId> {
    /**
     * @brief The unique identifier for this entity
     * @protected
     */
    protected readonly _id: EntityId;
    /**
     * @brief Timestamp when the entity was created
     * @protected
     */
    protected readonly _createdAt: Date;
    /**
     * @brief Timestamp when the entity was last updated
     * @protected
     */
    protected _updatedAt: Date;
    /**
     * @brief Constructs a new Entity instance
     * @param id The unique identifier for this entity
     * @param createdAt The creation timestamp
     * @param updatedAt The last update timestamp
     */
    protected constructor(id: EntityId, createdAt: Date, updatedAt: Date);
    /**
     * @brief Gets the entity's unique identifier
     * @returns {EntityId} The entity ID
     */
    getId(): EntityId;
    /**
     * @brief Gets the creation timestamp
     * @returns {Date} When the entity was created
     */
    getCreatedAt(): Date;
    /**
     * @brief Gets the last update timestamp
     * @returns {Date} When the entity was last updated
     */
    getUpdatedAt(): Date;
    /**
     * @brief Updates the entity's timestamp
     * @protected
     */
    protected setUpdatedAt(): void;
    /**
     * @brief Checks equality with another entity based on ID
     * @param other The entity to compare with
     * @returns {boolean} True if both entities have the same ID
     */
    equals(other: Entity<EntityId>): boolean;
    /**
     * @brief Returns a string representation of the entity
     * @returns {string} String representation including entity type and ID
     */
    toString(): string;
    /**
     * @brief Converts entity to plain object for serialization
     * @returns {Object} Plain object representation with common fields
     */
    toObject(): {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
//# sourceMappingURL=Entity.d.ts.map