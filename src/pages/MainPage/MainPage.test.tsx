import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BASE_URL } from '../../api/constants';
import { Layout } from '../../components/Layout/Layout';
import { ThemeProvider } from '../../context/ThemeContext';
import { type AppStore, setupStore } from '../../store/store';
import { AboutPage } from '../AboutPage/AboutPage';
import { MainPage } from './MainPage';

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
  });

  it('makes initial API call on component mount', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    renderMainPage();

    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchValue', 'Morty');
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      }),
    } as Response);

    renderMainPage();

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('Morty');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`${BASE_URL}?name=&page=1`)
    );
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      }),
    } as Response);

    renderMainPage();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Summer' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Summer');

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('name=Summer')
      );
    });
  });

  it('trims whitespace from search input before saving', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      }),
    } as Response);

    renderMainPage();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: '  Beth  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Beth');

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Beth'));
    });
  });

  it('does not trigger search if search value is the same as last submitted', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      }),
    } as Response);

    renderMainPage(['/?name=Rick&page=1']);

    const button = screen.getByRole('button', { name: /search/i });
    const initialFetchCount = vi.mocked(fetch).mock.calls.length;

    fireEvent.click(button);

    await waitFor(() => {
      expect(vi.mocked(fetch).mock.calls.length).toBe(initialFetchCount);
    });
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

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

    resolveFetch!({
      ok: true,
      json: async () => ({
        results: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      }),
    } as Response);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  it('keeps selected items when navigating to another page', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

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
