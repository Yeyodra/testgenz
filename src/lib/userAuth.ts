/**
 * User authentication and session management utilities
 */

const USER_DATA_KEY = 'testgenz_user';

export interface UserData {
  nama: string;
  email?: string;
}

/**
 * Check if user has valid session (has filled the form)
 */
export function isUserAuthenticated(): boolean {
  try {
    const savedUserData = localStorage.getItem(USER_DATA_KEY);
    if (!savedUserData) {
      return false;
    }
    
    const userData = JSON.parse(savedUserData);
    return !!(userData.nama && userData.nama.trim() !== "");
  } catch (err) {
    console.error("Failed to check user authentication:", err);
    return false;
  }
}

/**
 * Get current user data
 */
export function getCurrentUser(): UserData | null {
  try {
    const savedUserData = localStorage.getItem(USER_DATA_KEY);
    if (!savedUserData) {
      return null;
    }
    
    const userData = JSON.parse(savedUserData);
    if (!userData.nama || userData.nama.trim() === "") {
      return null;
    }
    
    return userData;
  } catch (err) {
    console.error("Failed to get current user:", err);
    return null;
  }
}

/**
 * Save user data (login)
 */
export function saveUserData(userData: UserData): void {
  try {
    if (!userData.nama || userData.nama.trim() === "") {
      throw new Error("Nama is required");
    }
    
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (err) {
    console.error("Failed to save user data:", err);
    throw err;
  }
}

/**
 * Clear user data (logout)
 */
export function clearUserData(): void {
  try {
    localStorage.removeItem(USER_DATA_KEY);
  } catch (err) {
    console.error("Failed to clear user data:", err);
  }
}
