import { Component } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

type InputProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
};

export class Input extends Component<InputProps> {
  render() {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <input
          type="text"
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
          name="input"
          className={classNames(styles.input, this.props.className)}
        />
      </div>
    );
  }
}
