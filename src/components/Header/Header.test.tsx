import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Header } from './Header';

const renderHeader = (title: string) =>
  render(
    <TestProviders>
      <Header title={title} />
    </TestProviders>
  );

describe('Header Component', () => {
  it('renders title correctly', () => {
    renderHeader('Test Title');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader('Search Engine App');
    // The link names come from the mock useTranslations which returns the key
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute(
      'href',
      '/en'
    );
    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute(
      'href',
      '/en/about'
    );
  });

  it('switches theme using radio controls', () => {
    renderHeader('Search Engine App');
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    fireEvent.click(screen.getByRole('radio', { name: 'Light' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
