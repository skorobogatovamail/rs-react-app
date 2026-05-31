import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders header and children', () => {
    render(
      <TestProviders>
        <MemoryRouter>
          <Layout>
            <div>Child Content</div>
          </Layout>
        </MemoryRouter>
      </TestProviders>
    );

    expect(screen.getByText('Search Engine App')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
