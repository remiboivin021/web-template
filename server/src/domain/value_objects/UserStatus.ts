/**
 * @class UserStatus
 * @brief Immutable user account status value object
 */
export class UserStatus {
    private readonly value: string;
    
    private static readonly VALID_STATUSES = ['active', 'inactive', 'suspended', 'pending'] as const;

    private constructor(value: string) {
        this.value = value;
    }

    public static create(status: string): UserStatus {
        if (!UserStatus.isValid(status)) {
            throw new Error(`Invalid status: ${status}`);
        }
        return new UserStatus(status.toLowerCase());
    }

    private static isValid(status: string): boolean {
        return UserStatus.VALID_STATUSES.includes(status.toLowerCase() as any);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: UserStatus): boolean {
        return other instanceof UserStatus && this.value === other.value;
    }

    public isActive(): boolean {
        return this.value === 'active';
    }

    public isSuspended(): boolean {
        return this.value === 'suspended';
    }

    public toString(): string {
        return this.value;
    }
}