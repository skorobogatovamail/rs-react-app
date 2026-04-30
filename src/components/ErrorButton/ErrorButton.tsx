import { Component } from 'react';

import { Button } from '../Button/Button';
import styles from './ErrorButton.module.css';

type ErrorButtonState = {
  hasError: boolean;
};

export class ErrorButton extends Component<object, ErrorButtonState> {
  state = {
    hasError: false,
  };

  handleClick = () => {
    this.setState({
      hasError: true,
    });
  };

  handleHideError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test error');
    }
    return (
      <Button className={styles.errorButton} onClick={this.handleClick}>
        Throw error
      </Button>
    );
  }
}
