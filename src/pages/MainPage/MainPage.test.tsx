import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Layout } from '../../components/Layout/Layout';
import { ThemeProvider } from '../../context/ThemeContext';
import { type AppStore, setupStore } from '../../store/store';
import { createMockResponse } from '../../test-utils/createMockResponse';
import { AboutPage } from '../AboutPage/AboutPage';
import { MainPage } from './MainPage';

const getFetchUrl = (index = 0) =>
  (vi.mocked(fetch).mock.calls[index][0] as Request).url;

const mockApiResponse = {
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      url: 'https://rickandmortyapi.com/api/character/1',
    },
  ],
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
};

let store: AppStore;

const renderMainPage = (initialEntries: string[] = ['/']) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <MainPage />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutPage />
                </Layout>
              }
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
    store = setupStore();

    vi.mocked(fetch).mockImplementation(() =>
      Promise.resolve(createMockResponse(mockApiResponse))
    );
  });

  it('makes initial API call on component mount', async () => {
    renderMainPage();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchValue', 'Morty');
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    );

    renderMainPage();

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(getFetchUrl()).toContain('name=&page=1');
    });
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    );

    renderMainPage();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Summer' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Summer');

    await waitFor(() => {
      expect(getFetchUrl(1)).toContain('name=Summer');
    });
  });

  it('trims whitespace from search input before saving', async () => {
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    );

    renderMainPage();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: '  Beth  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Beth');

    await waitFor(() => {
      expect(getFetchUrl(1)).toContain('name=Beth');
    });
  });

  it('does not trigger search if search value is the same as last submitted', async () => {
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    );

    renderMainPage(['/?name=Rick&page=1']);

    const button = screen.getByRole('button', { name: /search/i });
    const initialFetchCount = vi.mocked(fetch).mock.calls.length;

    fireEvent.click(button);

    await waitFor(() => {
      expect(vi.mocked(fetch).mock.calls.length).toBe(initialFetchCount);
    });
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(fetch).mockResolvedValue(
      createMockResponse({ error: 'Not found' }, { status: 404, ok: false })
    );

    renderMainPage();

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch characters/i)
      ).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', async () => {
    let resolveFetch: (value: Response | PromiseLike<Response>) => void;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    vi.mocked(fetch).mockReturnValue(fetchPromise);

    renderMainPage();

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    resolveFetch!(
      createMockResponse({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  it('keeps selected items when navigating to another page', async () => {
    renderMainPage();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select Rick Sanchez' })
    );
    expect(store.getState().selectedItems.selectedItems[1]).toBeDefined();

    fireEvent.click(screen.getByRole('link', { name: 'About' }));

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(store.getState().selectedItems.selectedItems[1]).toBeDefined();
  });
});
