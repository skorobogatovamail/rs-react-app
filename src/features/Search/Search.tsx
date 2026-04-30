import { Component } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Search.module.css';

export class Search extends Component {
  state = {
    value: '',
  };

  handleChange = (value: string) => {
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    console.log(this.state.value);
  };

  render() {
    return (
      <div className={styles.container}>
        <Input value={this.state.value} onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}>Search</Button>
      </div>
    );
  }
}
