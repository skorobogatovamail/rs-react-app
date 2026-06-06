import { type FormSubmission } from '../../../store/slices/formSubmissionsSlice';
import styles from './FormSubmissionResult.module.css';

export const FormSubmissionResult = ({ name, age }: FormSubmission) => {
  return (
    <div className={styles.container}>
      <div>name: {name}</div>
      <div>age: {age}</div>
    </div>
  );
};
