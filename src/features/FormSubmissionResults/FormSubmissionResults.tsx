import { type FormSubmission } from '../../store/slices/formSubmissionsSlice';
import { FormSubmissionResult } from './FormSubmissionResult/FormSubmissionResult';

import styles from './FormSubmissionResults.module.css';

interface IFormSubmissionResultsProps {
  results: FormSubmission[];
}
export const FormSubmissionResults: React.FC<IFormSubmissionResultsProps> = ({
  results,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>HookForm submission results</h2>
      {results.map((el) => (
        <FormSubmissionResult {...el} key={el.id} />
      ))}
    </div>
  );
};
