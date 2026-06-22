import { describe, expect, it } from 'vitest';

import { getPaginationRange } from './getPaginationRange';

describe('getPaginationRange', () => {
  it('returns all pages when total is small', () => {
    expect(getPaginationRange(1, 2)).toEqual([1, 2]);
  });

  it('includes dots and edge pages for large ranges', () => {
    const range = getPaginationRange(5, 10);

    expect(range[0]).toBe(1);
    expect(range).toContain('...');
    expect(range[range.length - 1]).toBe(10);
  });

  it('returns middle pages near the start', () => {
    const range = getPaginationRange(2, 10);

    expect(range).toContain(1);
    expect(range).toContain(2);
    expect(range).toContain(3);
  });
});
