import { type FormSubmission } from '../../../store/slices/formSubmissionsSlice';

import styles from './FormSubmissionResult.module.css';

export const FormSubmissionResult = ({
  name,
  age,
  email,
  gender,
  acceptTerms,
}: FormSubmission) => {
  return (
    <div className={styles.container}>
      <div>name: {name}</div>
      <div>age: {age}</div>
      <div>email: {email}</div>
      <div>gender: {gender}</div>
      <div>acceptTerms: {acceptTerms ? 'yes' : 'no'}</div>
    </div>
  );
};
