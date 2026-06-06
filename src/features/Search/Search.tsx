import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './Search.module.css';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onRefresh: () => void;
};

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onSubmit,
  onRefresh,
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
      <Button className={styles.searchButton} type="submit">
        Search
      </Button>
      <Button className={styles.refreshButton} onClick={onRefresh}>
        Refresh
      </Button>
    </form>
  );
};
