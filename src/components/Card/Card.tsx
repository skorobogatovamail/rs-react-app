import cn from 'classnames';
import Image from 'next/image';

import styles from './Card.module.css';

export type CardType = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

type CardProps = CardType & {
  isSelected?: boolean;
  onSelectChange?: (checked: boolean) => void;
};

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  isSelected = false,
  onSelectChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelectChange?.(e.target.checked);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={cn(styles.container, isSelected && styles.selected)}>
      {onSelectChange && (
        <label className={styles.checkboxLabel} onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={handleCheckboxChange}
            onClick={handleCheckboxClick}
            aria-label={`Select ${title}`}
          />
        </label>
      )}
      <div className={styles.imageContainer}>
        <Image src={image} alt={title} width={300} height={300} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
