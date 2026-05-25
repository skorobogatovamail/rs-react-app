import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SEARCH_VALUE_KEY, useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads empty string when key is missing', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_VALUE_KEY));

    expect(result.current.read()).toBe('');
  });

  it('writes and reads a value', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_VALUE_KEY));

    act(() => {
      result.current.write('Rick');
    });

    expect(result.current.read()).toBe('Rick');
    expect(localStorage.getItem(SEARCH_VALUE_KEY)).toBe('Rick');
  });

  it('removes a value', () => {
    localStorage.setItem(SEARCH_VALUE_KEY, 'Morty');
    const { result } = renderHook(() => useLocalStorage(SEARCH_VALUE_KEY));

    act(() => {
      result.current.remove();
    });

    expect(result.current.read()).toBe('');
    expect(localStorage.getItem(SEARCH_VALUE_KEY)).toBeNull();
  });
});
