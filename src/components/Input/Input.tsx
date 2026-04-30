import { Component } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
};

export class Input extends Component<InputProps> {
  render() {
    const { value, onChange, className, ...inputProps } = this.props;
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <input
          {...inputProps}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="input"
          className={classNames(styles.input, className)}
        />
      </div>
    );
  }
}
