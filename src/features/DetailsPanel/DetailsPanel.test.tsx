import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type AppStore, setupStore } from '../../store/store';
import { createMockResponse } from '../../test-utils/createMockResponse';
import { DetailsPanel } from './DetailsPanel';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  url: 'https://rickandmortyapi.com/api/character/1',
};

let store: AppStore;

const renderDetailsPanel = (id = '1') =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/details/${id}`]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPanel />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe('DetailsPanel', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.mocked(fetch).mockImplementation(() =>
      Promise.resolve(createMockResponse(mockCharacter))
    );
    store = setupStore();
  });

  it('shows loader then character details', async () => {
    renderDetailsPanel();

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({ error: 'Not found' }, { status: 404, ok: false })
    );

    renderDetailsPanel();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /failed to fetch character/i })
      ).toBeInTheDocument();
    });
  });

  it('navigates home when close is clicked', async () => {
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
