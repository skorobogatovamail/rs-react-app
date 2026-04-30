import { Component } from 'react';

import styles from './Header.module.css';

type HeaderProps = {
  title: string;
};

export class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className={styles.header}>
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}
