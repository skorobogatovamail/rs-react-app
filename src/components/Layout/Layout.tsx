import { Component } from 'react';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className={styles.container}>
        <Header title="Search Engine App" />
        <main className={styles.main}>{this.props.children}</main>
      </div>
    );
  }
}
