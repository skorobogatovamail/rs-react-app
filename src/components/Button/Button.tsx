import { Component } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        {...this.props}
      >
        {this.props.children}
      </button>
    );
  }
}
