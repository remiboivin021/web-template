/**
 * @class Role
 * @brief Immutable user role value object
 */
export declare class Role {
    private readonly value;
    private static readonly VALID_ROLES;
    private constructor();
    static create(role: string): Role;
    private static isValid;
    getValue(): string;
    equals(other: Role): boolean;
    isAdmin(): boolean;
    isModerator(): boolean;
    toString(): string;
}
//# sourceMappingURL=Role.d.ts.map