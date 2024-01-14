/** @format */

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Define the type for the storage interface
interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Create a no-operation (noop) storage that does nothing but resolves immediately
const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

// Use the appropriate storage depending on the environment
const storage: Storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
