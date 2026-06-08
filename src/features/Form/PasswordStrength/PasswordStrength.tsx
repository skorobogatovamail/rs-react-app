import styles from './PasswordStrength.module.css';

interface Props {
  password: string;
}

export const PasswordStrength = ({ password }: Props) => {
  const requirements = [
    { label: '1 number', test: /[0-9]/.test(password) },
    { label: '1 uppercase', test: /[A-Z]/.test(password) },
    { label: '1 lowercase', test: /[a-z]/.test(password) },
    { label: '1 special character', test: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.title}>Password requirements:</p>
      <ul className={styles.list}>
        {requirements.map((req) => (
          <li
            key={req.label}
            className={req.test ? styles.valid : styles.invalid}
          >
            {req.test ? '✓' : '○'} {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
