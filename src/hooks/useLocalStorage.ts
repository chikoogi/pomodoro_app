'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 컴포넌트가 마운트된 후에만 localStorage를 사용
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Date 객체 복원
        if (Array.isArray(parsed)) {
          setStoredValue(parsed.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            dueDate: item.dueDate ? new Date(item.dueDate) : null,
          })));
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  // 값이 변경될 때마다 localStorage 업데이트
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
} 