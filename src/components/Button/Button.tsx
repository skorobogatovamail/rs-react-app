'use client';

import classNames from 'classnames';

import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
};
