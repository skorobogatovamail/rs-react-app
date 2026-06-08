import styles from './FormField.module.css';

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
};

export const FormField: React.FC<React.PropsWithChildren<FormFieldProps>> = ({
  id,
  label,
  error,
  children,
}) => {
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        {children}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
