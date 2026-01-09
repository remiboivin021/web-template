"use strict";
/**
 * @file Entity.ts
 * @brief Base entity class for domain entities
 * @description Abstract base class that provides common functionality for all domain entities.
 * Implements entity identity and equality based on unique identifiers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
/**
 * @class Entity
 * @brief Abstract base class for all domain entities
 * @description Provides common entity behavior including identity management and equality comparison.
 * Entities are distinguished by their unique identifier rather than their attributes.
 * @template T The type of the entity's unique identifier (must extend EntityId)
 */
class Entity {
    /**
     * @brief Constructs a new Entity instance
     * @param id The unique identifier for this entity
     * @param createdAt The creation timestamp
     * @param updatedAt The last update timestamp
     */
    constructor(id, createdAt, updatedAt) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }
    /**
     * @brief Gets the entity's unique identifier
     * @returns {T} The entity ID
     */
    getId() {
        return this._id;
    }
    /**
     * @brief Gets the creation timestamp
     * @returns {Date} When the entity was created
     */
    getCreatedAt() {
        return this._createdAt;
    }
    /**
     * @brief Gets the last update timestamp
     * @returns {Date} When the entity was last updated
     */
    getUpdatedAt() {
        return this._updatedAt;
    }
    /**
     * @brief Updates the entity's timestamp
     * @protected
     */
    setUpdatedAt() {
        this._updatedAt = new Date();
    }
    /**
     * @brief Checks equality with another entity based on ID
     * @param other The entity to compare with
     * @returns {boolean} True if both entities have the same ID
     */
    equals(other) {
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
    toString() {
        return `${this.constructor.name}(${this._id})`;
    }
    /**
     * @brief Converts entity to plain object for serialization
     * @returns {Object} Plain object representation with common fields
     */
    toObject() {
        return {
            id: this._id.getValue(),
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map