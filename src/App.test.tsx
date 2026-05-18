import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MainPage } from './pages/MainPage/MainPage';
import { renderAppWithOutlet } from './test-utils/renderWithRouter';

vi.mock('./pages/MainPage/MainPage', () => ({
  MainPage: vi.fn(() => <div>Mock MainPage</div>),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ results: [], info: { pages: 0 } }),
        })
      )
    );
    vi.clearAllMocks();
  });

  it('renders Layout and MainPage', () => {
    renderAppWithOutlet(<MainPage />);
    expect(screen.getByText('Search Engine App')).toBeInTheDocument();
    expect(screen.getByText('Mock MainPage')).toBeInTheDocument();
  });

  it('calls window.location.reload when reload button is clicked in error state', () => {
    const reloadSpy = vi.fn();
    vi.stubGlobal('location', { ...window.location, reload: reloadSpy });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(MainPage).mockImplementation(() => {
      throw new Error('Test error');
    });

    renderAppWithOutlet(<MainPage />);

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    fireEvent.click(reloadButton);

    expect(reloadSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
