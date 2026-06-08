import { useEffect, useState } from 'react';

import { type FormSubmission } from '../../../store/slices/formSubmissionsSlice';

import styles from './FormSubmissionResult.module.css';

export const FormSubmissionResult = ({
  name,
  age,
  email,
  gender,
  acceptTerms,
  image,
  country,
  timestamp,
}: FormSubmission) => {
  const [isHighlighted, setIsHighlighted] = useState(() => {
    const now = Date.now();
    return now - timestamp < 1000;
  });

  useEffect(() => {
    if (isHighlighted) {
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000); // Подсветка на 2 секунды
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);

  return (
    <div
      className={`${styles.container} ${isHighlighted ? styles.highlighted : ''}`}
    >
      <div className={styles.textContent}>
        <div>name: {name}</div>
        <div>age: {age}</div>
        <div>email: {email}</div>
        <div>gender: {gender}</div>
        <div>acceptTerms: {acceptTerms ? 'yes' : 'no'}</div>
        <div>country: {country}</div>
      </div>

      {image && <img src={image} alt="uploaded" className={styles.image}></img>}
    </div>
  );
};
