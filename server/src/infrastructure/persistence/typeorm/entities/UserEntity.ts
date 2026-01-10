/**
 * @file UserEntity.ts
 * @brief TypeORM User entity definition
 * @description Maps User domain entity to database table
 */

import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum RoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    GUEST = 'GUEST',
}

export enum StatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    PENDING = 'PENDING',
}

export enum ConnectionStatusEnum {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    AWAY = 'AWAY',
    BUSY = 'BUSY',
}

@Entity('users')
export class UserEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role!: RoleEnum;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.ACTIVE,
    })
    status!: StatusEnum;

    @Column({
        type: 'enum',
        enum: ConnectionStatusEnum,
        default: ConnectionStatusEnum.OFFLINE,
        name: 'connection_status',
    })
    connectionStatus!: ConnectionStatusEnum;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
