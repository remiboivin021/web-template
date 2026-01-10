/**
 * @file UserMapper.ts
 * @brief Maps between domain User entity and TypeORM User entity
 * @description Handles conversion between domain layer and persistence layer
 */

import { UserEntity, RoleEnum, ConnectionStatusEnum } from '../typeorm/entities/UserEntity';
import { User } from '../../../domain/entities/User';
import { EntityId } from '../../../domain/value_objects/EntityId';
import { Email } from '../../../domain/value_objects/Email';
import { Username } from '../../../domain/value_objects/Username';
import { Password } from '../../../domain/value_objects/Password';
import { Role } from '../../../domain/value_objects/Role';
import { ConnectionStatus } from '../../../domain/value_objects/ConnectionStatus';

/**
 * @class UserMapper
 * @brief Mapper for User entity
 */
export class UserMapper {
    /**
     * @brief Convert TypeORM UserEntity to Domain User
     */
    public static toDomain(userEntity: UserEntity): User {
        return User.reconstitute(
            EntityId.create(userEntity.id),
            Email.create(userEntity.email),
            Username.create(userEntity.username),
            Password.createFromHash(userEntity.password),
            Role.create(userEntity.role.toLowerCase()),
            userEntity.createdAt,
            userEntity.updatedAt,
            ConnectionStatus.create(userEntity.connectionStatus.toLowerCase())
        );
    }

    /**
     * @brief Convert Domain User to TypeORM UserEntity data
     */
    public static toEntity(user: User): UserEntity {
        const entity = new UserEntity();
        entity.id = user.getId().getValue();
        entity.email = user.getEmail().getValue();
        entity.username = user.getUsername().getValue();
        entity.password = user.getPassword().getValue();
        entity.role = user.getRole().getValue().toUpperCase() as RoleEnum;
        entity.connectionStatus = user.getConnectionStatus().getValue().toUpperCase() as ConnectionStatusEnum;
        return entity;
    }

    /**
     * @brief Convert Domain User to partial TypeORM update data
     */
    public static toUpdateEntity(user: User): Partial<UserEntity> {
        return {
            email: user.getEmail().getValue(),
            username: user.getUsername().getValue(),
            password: user.getPassword().getValue(),
            role: user.getRole().getValue().toUpperCase() as RoleEnum,
            connectionStatus: user.getConnectionStatus().getValue().toUpperCase() as ConnectionStatusEnum,
        };
    }
}