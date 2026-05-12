import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders header and children', () => {
    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(screen.getByText('Search Engine App')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
