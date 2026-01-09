"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
/**
 * @class Role
 * @brief Immutable user role value object
 */
class Role {
    constructor(value) {
        this.value = value;
    }
    static create(role) {
        if (!Role.isValid(role)) {
            throw new Error(`Invalid role: ${role}. Must be one of: ${Role.VALID_ROLES.join(', ')}`);
        }
        return new Role(role.toLowerCase());
    }
    static isValid(role) {
        return Role.VALID_ROLES.includes(role.toLowerCase());
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return other instanceof Role && this.value === other.value;
    }
    isAdmin() {
        return this.value === 'admin';
    }
    isModerator() {
        return this.value === 'moderator';
    }
    toString() {
        return this.value;
    }
}
exports.Role = Role;
Role.VALID_ROLES = ['admin', 'user', 'moderator', 'guest'];
//# sourceMappingURL=Role.js.map