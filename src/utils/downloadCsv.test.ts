import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CardType } from '../components/Card/Card';
import { downloadSelectedItemsAsCsv } from './downloadCsv';

const mockItems: CardType[] = [
  {
    id: 1,
    title: 'Rick Sanchez',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    link: 'https://rickandmortyapi.com/api/character/1',
  },
  {
    id: 2,
    title: 'Morty, "Smith"',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    link: 'https://rickandmortyapi.com/api/character/2',
  },
];

describe('downloadSelectedItemsAsCsv', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('does nothing when items array is empty', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL');
    downloadSelectedItemsAsCsv([]);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it('creates blob and downloads file with item count in name', () => {
    const clickMock = vi.fn();
    const link = {
      click: clickMock,
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement;
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');

    downloadSelectedItemsAsCsv(mockItems);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(link.download).toBe('2_items.csv');
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  it('escapes special characters in csv values', () => {
    let blobContent = '';
    vi.spyOn(globalThis, 'Blob').mockImplementation(function (
      this: Blob,
      parts?: BlobPart[]
    ) {
      blobContent = (parts ?? []).join('');
      return {} as Blob;
    });
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(document, 'createElement').mockReturnValue({
      click: vi.fn(),
    } as unknown as HTMLAnchorElement);

    downloadSelectedItemsAsCsv([mockItems[1]]);

    expect(blobContent).toContain('"Morty, ""Smith"""');
  });
});
