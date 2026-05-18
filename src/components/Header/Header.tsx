import classNames from 'classnames';
import { NavLink } from 'react-router';

import styles from './Header.module.css';

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
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
    </header>
  );
};
