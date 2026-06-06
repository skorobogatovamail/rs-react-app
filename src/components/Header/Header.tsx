import classNames from 'classnames';
import { NavLink } from 'react-router';

import { useTheme } from '../../context/useTheme';
import { ModalContainer } from '../../features/ModalContainer/ModalContainer';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Header.module.css';

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, setTheme } = useTheme();

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
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              classNames(styles.navLink, isActive && styles.navLinkActive)
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              classNames(styles.navLink, isActive && styles.navLinkActive)
            }
          >
            About
          </NavLink>
        </nav>

        <ModalContainer />

        <ErrorButton />
      </div>
    </header>
  );
};
