import classNames from 'classnames';
import { Component } from 'react';

import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        {...this.props}
        className={classNames(styles.button, this.props.className)}
      >
        {this.props.children}
      </button>
    );
  }
}
