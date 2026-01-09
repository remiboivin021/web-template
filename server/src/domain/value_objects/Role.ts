/**
 * @class Role
 * @brief Immutable user role value object
 */
export class Role {
    private readonly value: string;
    
    private static readonly VALID_ROLES = ['admin', 'user', 'moderator', 'guest'] as const;

    private constructor(value: string) {
        this.value = value;
    }

    public static create(role: string): Role {
        if (!Role.isValid(role)) {
            throw new Error(`Invalid role: ${role}. Must be one of: ${Role.VALID_ROLES.join(', ')}`);
        }
        return new Role(role.toLowerCase());
    }

    private static isValid(role: string): boolean {
        return Role.VALID_ROLES.includes(role.toLowerCase() as any);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: Role): boolean {
        return other instanceof Role && this.value === other.value;
    }

    public isAdmin(): boolean {
        return this.value === 'admin';
    }

    public isModerator(): boolean {
        return this.value === 'moderator';
    }

    public toString(): string {
        return this.value;
    }
}