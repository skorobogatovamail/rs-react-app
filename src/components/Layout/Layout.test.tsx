import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders header and children', () => {
    render(
      <TestProviders>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </TestProviders>
    );

    // Header title is now localized, mock returns the key
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
