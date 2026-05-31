import { describe, expect, it } from 'vitest';

import { router } from './router';

describe('router', () => {
  it('defines application routes', () => {
    expect(router.routes).toHaveLength(1);
    expect(router.routes[0]?.path).toBe('/');
  });
});
