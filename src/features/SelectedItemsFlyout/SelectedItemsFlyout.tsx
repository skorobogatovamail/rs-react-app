import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAll } from '../../store/selectedItemsSlice';
import {
  selectSelectedCount,
  selectSelectedItemsList,
} from '../../store/selectors';
import { downloadSelectedItemsAsCsv } from '../../utils/downloadCsv';
import styles from './SelectedItemsFlyout.module.css';

export const SelectedItemsFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectSelectedCount);
  const selectedItems = useAppSelector(selectSelectedItemsList);

  if (selectedCount === 0) {
    return null;
  }

  const handleDownload = () => {
    downloadSelectedItemsAsCsv(selectedItems);
  };

  const handleClearAll = () => {
    dispatch(clearAll());
  };

  return (
    <aside className={styles.flyout} aria-label="Selected items summary">
      <p className={styles.count}>
        {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
      </p>
      <div className={styles.actions}>
        <Button onClick={handleClearAll}>Unselect all</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </aside>
  );
};
