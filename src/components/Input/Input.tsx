import classNames from 'classnames';

import styles from './Input.module.css';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value?: string | number;
  onChange?: (value: string | number) => void;
  type?: string;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  type,
  ...inputProps
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <input
        type={type || 'text'}
        onChange={(e) => onChange?.(e.target.value)}
        className={classNames(styles.input, className)}
        {...(value !== undefined ? { value } : {})}
        {...inputProps}
      />
    </div>
  );
};
