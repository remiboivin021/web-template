/**
 * @interface IUserRepository
 * @brief Outbound port for user persistence operations
 */

import { User } from "../../../domain/entities/User";
import { EntityId } from "../../../domain/value_objects/EntityId";

export interface IUserRepository {
  /**
   * @brief Find a user by their unique identifier
   * @param id The user's entity ID
   * @returns Promise resolving to User or null if not found
   */
  findById(id: EntityId): Promise<User | null>;

  /**
   * @brief Find a user by their email address
   * @param email The user's email
   * @returns Promise resolving to User or null if not found
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * @brief Save a new user to the database
   * @param user The user entity to save
   */
  save(user: User): Promise<void>;

  /**
   * @brief Update an existing user
   * @param user The user entity with updated data
   */
  update(user: User): Promise<void>;

  /**
   * @brief Delete a user by their ID
   * @param id The user's entity ID
   */
  delete(id: EntityId): Promise<void>;

  /**
   * @brief Find all users
   * @returns Promise resolving to array of users
   */
  findAll(): Promise<User[]>;
}