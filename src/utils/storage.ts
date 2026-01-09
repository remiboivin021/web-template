/**
 * Storage utilities for localStorage and sessionStorage
 * Type-safe storage operations with error handling
 */

class Storage {
  private storage: globalThis.Storage;

  constructor(storageType: 'local' | 'session') {
    this.storage = storageType === 'local' ? localStorage : sessionStorage;
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to storage:`, error);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const localStore = new Storage('local');
export const sessionStore = new Storage('session');
