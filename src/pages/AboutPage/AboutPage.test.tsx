import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders author and course information', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Elena Skorobogatova/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /skorobogatovamail/i })
    ).toHaveAttribute('href', 'https://github.com/skorobogatovamail');
    expect(
      screen.getByRole('link', { name: /RS School — React course/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactru');
  });
});
