import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './Search.module.css';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Input value={value} onChange={onChange} placeholder="Search" />
      <Button type="submit">Search</Button>
    </form>
  );
};
