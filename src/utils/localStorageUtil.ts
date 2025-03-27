// Setter function: Set an item in localStorage
export const setItem = <T>(key: string, value: T): void => {
    try {
      // Convert the value to a JSON string before saving it
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error('Error setting item in localStorage', e);
    }
  };
  
  // Getter function: Get an item from localStorage
  export const getItem = <T>(key: string): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue) {
        return JSON.parse(serializedValue);
      }
      return null;
    } catch (e) {
      console.error('Error getting item from localStorage', e);
      return null;
    }
  };
  
  // Delete function: Remove an item from localStorage
  export const removeItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing item from localStorage', e);
    }
  };
  
  // Clear all items in localStorage
  export const clearAll = (): void => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  };