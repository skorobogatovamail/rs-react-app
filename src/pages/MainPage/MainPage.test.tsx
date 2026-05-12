import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MainPage } from './MainPage';

const mockResults = {
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      url: 'https://rickandmortyapi.com/api/character/1',
    },
  ],
};

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
  });

  it('makes initial API call on component mount', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResults,
    } as Response);

    render(<MainPage />);

    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchValue', 'Morty');
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    render(<MainPage />);

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('Morty');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Morty'));
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    render(<MainPage />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Summer' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Summer');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Summer'));
  });

  it('trims whitespace from search input before saving', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    render(<MainPage />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: '  Beth  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Beth');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Beth'));
  });

  it('does not trigger search if search value is the same as last submitted', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    render(<MainPage />);

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button', { name: /search/i });

    // First search
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(2); // Initial + First search

    // Second search with same value
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(2); // Should not call again
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    render(<MainPage />);

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

    render(<MainPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    resolveFetch!({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
