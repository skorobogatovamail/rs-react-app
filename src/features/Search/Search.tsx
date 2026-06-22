import { useTranslations } from 'next-intl';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './Search.module.css';

type SearchProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const Search: React.FC<SearchProps> = ({
  defaultValue,
  value,
  onChange,
}) => {
  const t = useTranslations('Main');

  return (
    <div className={styles.container}>
      <Input
        name="query"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={t('placeholder')}
      />
      <Button type="submit">{t('search')}</Button>
    </div>
  );
};
