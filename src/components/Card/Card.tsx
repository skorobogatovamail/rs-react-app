import styles from './Card.module.css';
export type CardType = {
  id: number;
  title: string;
  description: string;
  image: string;
};
export const Card: React.FC<CardType> = ({ title, description, image }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
