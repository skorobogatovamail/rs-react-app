import { Controller, useForm } from 'react-hook-form';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAppDispatch } from '../../store/hooks';
import {
  addSubmission,
  type FormSubmission,
} from '../../store/slices/formSubmissionsSlice';
import styles from './Form.module.css';

interface IFormProps {
  onSave?: () => void;
}

export const Form = ({ onSave }: IFormProps) => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormSubmission) => {
    dispatch(addSubmission(data));
    onSave?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input {...field} />}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => <Input {...field} />}
      />

      <Button type="submit">Save</Button>
    </form>
  );
};
