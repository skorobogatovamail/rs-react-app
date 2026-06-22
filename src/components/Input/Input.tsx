'use client';

import classNames from 'classnames';

import styles from './Input.module.css';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value?: string;
  onChange?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...inputProps
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <input
        {...inputProps}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={classNames(styles.input, className)}
      />
    </div>
  );
};
