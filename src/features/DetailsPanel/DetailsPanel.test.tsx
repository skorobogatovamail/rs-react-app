import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DetailsPanel } from './DetailsPanel';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  url: 'https://rickandmortyapi.com/api/character/1',
};

const renderDetailsPanel = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route path="/details/:id" element={<DetailsPanel />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('DetailsPanel', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('shows loader then character details', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    renderDetailsPanel();

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    renderDetailsPanel();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /failed to fetch character/i })
      ).toBeInTheDocument();
    });
  });

  it('navigates home when close is clicked', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    renderDetailsPanel();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close details/i }));

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
