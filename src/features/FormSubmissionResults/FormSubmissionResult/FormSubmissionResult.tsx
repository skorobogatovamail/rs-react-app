import { type FormSubmission } from '../../../store/slices/formSubmissionsSlice';

import styles from './FormSubmissionResult.module.css';

export const FormSubmissionResult = ({
  name,
  age,
  email,
  gender,
  acceptTerms,
  image,
}: FormSubmission) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <div>name: {name}</div>
        <div>age: {age}</div>
        <div>email: {email}</div>
        <div>gender: {gender}</div>
        <div>acceptTerms: {acceptTerms ? 'yes' : 'no'}</div>
      </div>

      {image && <img src={image} alt="uploaded" className={styles.image}></img>}
    </div>
  );
};
