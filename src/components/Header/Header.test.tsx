import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from './Header';

describe('Header Component', () => {
  it('renders title correctly', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
