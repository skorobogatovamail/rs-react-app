import { Component } from 'react';
import styles from './Card.module.css';
export type CardType = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};
export class Card extends Component<CardType> {
  render() {
    return (
      <div className={styles.container}>
        <img src={this.props.image} alt={this.props.title} />
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
          {this.props.link}
        </a>
      </div>
    );
  }
}
