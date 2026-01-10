/**
 * @class UserRepository
 * @brief Concrete implementation of user persistence using TypeORM
 * @implements {IUserRepository}
 */

import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../application/ports/outbound/IUserRepository';
import { User } from '../../../domain/entities/User';
import { EntityId } from '../../../domain/value_objects/EntityId';
import { AppDataSource } from '../typeorm/typeorm.config';
import { UserEntity } from '../typeorm/entities/UserEntity';
import { UserMapper } from '../mappers/UserMapper';
import { Logger } from '../../../shared/logger';
import { DatabaseError, NotFoundError } from '../../../shared/errors';

const logger = Logger.create('UserRepository');

@injectable()
export class UserRepository implements IUserRepository {
    private repository: Repository<UserEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity);
    }

    async findById(id: EntityId): Promise<User | null> {
        try {
            const userEntity = await this.repository.findOne({
                where: { id: id.getValue() },
            });

            if (!userEntity) {
                return null;
            }

            return UserMapper.toDomain(userEntity);
        } catch (error) {
            logger.error('Error finding user by ID', error, { id: id.getValue() });
            throw new DatabaseError('Failed to find user by ID', error);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const userEntity = await this.repository.findOne({
                where: { email },
            });

            if (!userEntity) {
                return null;
            }

            return UserMapper.toDomain(userEntity);
        } catch (error) {
            logger.error('Error finding user by email', error, { email });
            throw new DatabaseError('Failed to find user by email', error);
        }
    }

    async save(user: User): Promise<void> {
        try {
            const userEntity = UserMapper.toEntity(user);
            await this.repository.save(userEntity);
            logger.info('User saved successfully', { id: user.getId().getValue() });
        } catch (error) {
            logger.error('Error saving user', error, { id: user.getId().getValue() });
            throw new DatabaseError('Failed to save user', error);
        }
    }

    async update(user: User): Promise<void> {
        try {
            const updateData = UserMapper.toUpdateEntity(user);
            const result = await this.repository.update(
                { id: user.getId().getValue() },
                updateData
            );

            if (result.affected === 0) {
                throw new NotFoundError('User');
            }

            logger.info('User updated successfully', { id: user.getId().getValue() });
        } catch (error) {
            logger.error('Error updating user', error, { id: user.getId().getValue() });
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update user', error);
        }
    }

    async delete(id: EntityId): Promise<void> {
        try {
            const result = await this.repository.delete({ id: id.getValue() });
            
            if (result.affected === 0) {
                throw new NotFoundError('User');
            }

            logger.info('User deleted successfully', { id: id.getValue() });
        } catch (error) {
            logger.error('Error deleting user', error, { id: id.getValue() });
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete user', error);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const userEntities = await this.repository.find();
            return userEntities.map(entity => UserMapper.toDomain(entity));
        } catch (error) {
            logger.error('Error finding all users', error);
            throw new DatabaseError('Failed to find all users', error);
        }
    }
}