import { Component } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Search.module.css';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export class Search extends Component<SearchProps> {
  render() {
    return (
      <div className={styles.container}>
        <Input
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder="Search"
        />
        <Button onClick={this.props.onSubmit}>Search</Button>
      </div>
    );
  }
}
