import { useEffect, useState } from "react";

/**--------------
 * useLocalStorage
 * React state hook that persists a value to localStorage under a given key.
 *
 * Params:
 * - key: localStorage key to read/write
 * - initialValue: fallback value when storage is empty or unreadable
 *
 * Returns:
 * - [value, setValue] just like useState, but using localStorage
 */
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            // Read once on mount; if key is missing, use the provided initial value.
            const saved = localStorage.getItem(key);
            if (saved === null) return initialValue;

            // Restore persisted JSON payload.
            const parsed = JSON.parse(saved);
            return parsed ?? initialValue;
        } catch {
            // Invalid JSON / storage access issue: fall back to initial value.
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Ignore write failures (private mode/quota) and keep app state in memory.
        }
    }, [key, value]);

    return [value, setValue];
}