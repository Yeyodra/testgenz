import { TestResult } from '@/types';

const STORAGE_KEY = 'testgenz_result';

/**
 * Validates that a test result has all required fields
 */
function validateTestResult(data: any): data is TestResult {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check required fields
  if (typeof data.weatherType !== 'string' || !data.weatherType) {
    return false;
  }

  if (typeof data.analysis !== 'string' || !data.analysis) {
    return false;
  }

  if (typeof data.timestamp !== 'string' || !data.timestamp) {
    return false;
  }

  // Check userData object
  if (!data.userData || typeof data.userData !== 'object') {
    return false;
  }

  if (typeof data.userData.nama !== 'string' || !data.userData.nama) {
    return false;
  }

  // email is optional, but if present must be string
  if (data.userData.email !== undefined && typeof data.userData.email !== 'string') {
    return false;
  }

  return true;
}

/**
 * Save test result to localStorage
 * @param result - The test result to save
 * @throws Error if localStorage is unavailable or data is invalid
 */
export function saveTestResult(result: TestResult): void {
  try {
    // Validate data structure before saving
    if (!validateTestResult(result)) {
      throw new Error('Invalid test result structure');
    }

    const jsonString = JSON.stringify(result);
    localStorage.setItem(STORAGE_KEY, jsonString);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid test result structure') {
      throw error;
    }
    // Handle localStorage unavailable or quota exceeded
    console.error('Failed to save test result to localStorage:', error);
    throw new Error('Unable to save test result');
  }
}

/**
 * Get test result from localStorage
 * @returns The test result or null if not found or invalid
 */
export function getTestResult(): TestResult | null {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY);
    
    if (!jsonString) {
      return null;
    }

    const data = JSON.parse(jsonString);
    
    // Validate the parsed data
    if (!validateTestResult(data)) {
      console.warn('Invalid test result data in localStorage');
      return null;
    }

    return data;
  } catch (error) {
    // Handle JSON parsing errors or localStorage access errors
    console.error('Failed to get test result from localStorage:', error);
    return null;
  }
}

/**
 * Clear test result from localStorage
 */
export function clearTestResult(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear test result from localStorage:', error);
    // Don't throw - clearing is not critical
  }
}

const HISTORY_KEY = 'testgenz_history';

/**
 * Save test result to history
 * @param result - The test result to add to history
 */
export function saveTestResultToHistory(result: TestResult): void {
  try {
    // Validate data structure before saving
    if (!validateTestResult(result)) {
      throw new Error('Invalid test result structure');
    }

    // Get existing history
    const history = getTestResultHistory();
    
    // Add new result to the beginning of the array
    history.unshift(result);
    
    // Keep only last 10 results
    const limitedHistory = history.slice(0, 10);
    
    // Save back to localStorage
    const jsonString = JSON.stringify(limitedHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
  } catch (error) {
    console.error('Failed to save test result to history:', error);
    // Don't throw - history is not critical
  }
}

/**
 * Get all test results from history
 * @returns Array of test results, newest first
 */
export function getTestResultHistory(): TestResult[] {
  try {
    const jsonString = localStorage.getItem(HISTORY_KEY);
    
    if (!jsonString) {
      return [];
    }

    const data = JSON.parse(jsonString);
    
    // Validate that it's an array
    if (!Array.isArray(data)) {
      console.warn('Invalid history data in localStorage');
      return [];
    }
    
    // Filter out invalid results
    const validResults = data.filter(item => validateTestResult(item));
    
    return validResults;
  } catch (error) {
    console.error('Failed to get test result history from localStorage:', error);
    return [];
  }
}

/**
 * Clear all test result history
 */
export function clearTestResultHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear test result history from localStorage:', error);
  }
}

/**
 * Delete a specific test result from history by timestamp
 * @param timestamp - The timestamp of the result to delete
 */
export function deleteTestResultFromHistory(timestamp: string): void {
  try {
    const history = getTestResultHistory();
    const filteredHistory = history.filter(result => result.timestamp !== timestamp);
    
    const jsonString = JSON.stringify(filteredHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
  } catch (error) {
    console.error('Failed to delete test result from history:', error);
  }
}

/**
 * Update user name in all history entries
 * This keeps the history consistent when user changes their name
 * @param newName - The new name to apply to all history entries
 */
export function updateHistoryUserName(newName: string): void {
  try {
    const history = getTestResultHistory();
    
    if (history.length === 0) {
      return;
    }
    
    // Update nama in all history entries
    const updatedHistory = history.map(result => ({
      ...result,
      userData: {
        ...result.userData,
        nama: newName,
      },
    }));
    
    // Save updated history
    const jsonString = JSON.stringify(updatedHistory);
    localStorage.setItem(HISTORY_KEY, jsonString);
    
    // Also update current result if exists
    const currentResult = getTestResult();
    if (currentResult) {
      const updatedResult = {
        ...currentResult,
        userData: {
          ...currentResult.userData,
          nama: newName,
        },
      };
      saveTestResult(updatedResult);
    }
  } catch (error) {
    console.error('Failed to update history user name:', error);
  }
}
