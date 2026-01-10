/**
 * @file Entity.ts
 * @brief Base entity class for domain entities
 * @description Abstract base class that provides common functionality for all domain entities.
 * Implements entity identity and equality based on unique identifiers.
 */

import { EntityId } from '../value_objects/EntityId';

/**
 * @class Entity
 * @brief Abstract base class for all domain entities
 * @description Provides common entity behavior including identity management and equality comparison.
 * Entities are distinguished by their unique identifier rather than their attributes.
 * @template EntityId The type of the entity's unique identifier
 */
export abstract class Entity<EntityId> {
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
    protected constructor(id: EntityId, createdAt: Date, updatedAt: Date) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    /**
     * @brief Gets the entity's unique identifier
     * @returns {EntityId} The entity ID
     */
    public getId(): EntityId {
        return this._id;
    }

    /**
     * @brief Gets the creation timestamp
     * @returns {Date} When the entity was created
     */
    public getCreatedAt(): Date {
        return this._createdAt;
    }

    /**
     * @brief Gets the last update timestamp
     * @returns {Date} When the entity was last updated
     */
    public getUpdatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * @brief Updates the entity's timestamp
     * @protected
     */
    protected touch(): void {
        this._updatedAt = new Date();
    }

    /**
     * @brief Checks equality with another entity based on ID
     * @param other The entity to compare with
     * @returns {boolean} True if both entities have the same ID
     */
    public equals(other: Entity<EntityId>): boolean {
        if (!(other instanceof Entity)) {
            return false;
        }

        if (this === other) {
            return true;
        }

        return this._id === other._id;
    }

    /**
     * @brief Returns a string representation of the entity
     * @returns {string} String representation including entity type and ID
     */
    public toString(): string {
        return `${this.constructor.name}(${this._id})`;
    }
}