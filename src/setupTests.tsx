import '@testing-library/jest-dom';

import { vi } from 'vitest';

vi.mock('next-intl', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en',
  };
});

vi.mock('./src/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));
