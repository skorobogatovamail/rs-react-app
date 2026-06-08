import { describe, expect, it } from 'vitest';

import { validateImageFile } from './validateImageFile';

describe('Form Utilities', () => {
  it('validateImageFile should return error for wrong type', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    expect(validateImageFile(file)).toBe('Only PNG and JPEG are allowed');
  });

  it('validateImageFile should return null for valid image', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    expect(validateImageFile(file)).toBeNull();
  });
});
