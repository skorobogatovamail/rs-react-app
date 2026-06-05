import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { rickAndMortyApi } from '../../services/rickAndMorty';
import { useAppDispatch } from '../../store/hooks';
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
  const dispatch = useAppDispatch();

  function handleRefresh() {
    dispatch(
      rickAndMortyApi.util.invalidateTags([{ type: 'Characters', id: 'LIST' }])
    );
  }
  return (
    <>
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
        <Button className={styles.refreshButton} onClick={handleRefresh}>
          Refresh
        </Button>
      </form>
    </>
  );
};
