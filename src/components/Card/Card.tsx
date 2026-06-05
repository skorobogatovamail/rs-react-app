import cn from 'classnames';

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
  onCardClick?: () => void;
};

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  isSelected = false,
  onSelectChange,
  onCardClick,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelectChange?.(e.target.checked);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCardClick = () => {
    onCardClick?.();
  };

  return (
    <div
      className={cn(styles.container, isSelected && styles.selected)}
      onClick={onCardClick ? handleCardClick : undefined}
      onKeyDown={
        onCardClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick();
              }
            }
          : undefined
      }
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
    >
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
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
