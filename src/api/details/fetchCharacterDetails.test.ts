import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BASE_URL } from '../constants';
import { fetchCharacterDetails } from './fetchCharacterDetails';

describe('fetchCharacterDetails', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('returns mapped character data', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick Sanchez',
        species: 'Human',
        image: 'https://example.com/rick.jpeg',
        url: 'https://example.com/character/1',
      }),
    } as Response);

    const result = await fetchCharacterDetails('1');

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/1`);
    expect(result).toEqual({
      id: 1,
      title: 'Rick Sanchez',
      description: 'Human',
      image: 'https://example.com/rick.jpeg',
      link: 'https://example.com/character/1',
    });
  });

  it('throws when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    await expect(fetchCharacterDetails('99')).rejects.toThrow(
      'failed to fetch charachter data'
    );
  });
});
