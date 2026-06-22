'use client';

import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';

import { useTheme } from '../../context/useTheme';
import { Link, usePathname, useRouter } from '../../i18n/routing';
import styles from './Header.module.css';

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.controls}>
        <fieldset className={styles.themeFieldset}>
          <legend className={styles.themeLegend}>Theme</legend>
          <label className={styles.themeOption}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
            />
            Light
          </label>
          <label className={styles.themeOption}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            Dark
          </label>
        </fieldset>

        <div className={styles.localeSwitcher}>
          <label>
            <select value={locale} onChange={onLocaleChange}>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </label>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link
            href="/"
            className={classNames(
              styles.navLink,
              pathname === '/' && styles.navLinkActive
            )}
          >
            {t('home')}
          </Link>
          <Link
            href="/about"
            className={classNames(
              styles.navLink,
              pathname === '/about' && styles.navLinkActive
            )}
          >
            {t('about')}
          </Link>
        </nav>
      </div>
    </header>
  );
};
