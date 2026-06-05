import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import App from '../App';
import { TestProviders } from './TestProviders';

export const renderAppWithOutlet = (
  page: React.ReactElement,
  { initialEntries = ['/'] }: { initialEntries?: string[] } = {}
) =>
  render(
    <TestProviders>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={page} />
          </Route>
        </Routes>
      </MemoryRouter>
    </TestProviders>
  );
