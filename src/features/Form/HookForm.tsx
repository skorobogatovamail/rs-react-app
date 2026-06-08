import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { type FormSubmission } from '../../store/slices/formSubmissionsSlice';
import { FormField } from './FormField/FormField';
import { GenderSelect } from './GenderSelect/GenderSelect';
import { useFormSubmission } from './hooks/useFormSubmission';

import styles from './Form.module.css';

interface IFormProps {
  onSave?: () => void;
}

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.string().required(),
    email: yup.string().required(),
    gender: yup.string().required(),
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept Terms and Conditions')
      .required(),
  })
  .required();

export const HookForm = ({ onSave }: IFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSubmission>({
    resolver: yupResolver(schema) as Resolver<FormSubmission>,
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: '',
      acceptTerms: false,
    },
  });

  const { submit } = useFormSubmission(onSave);

  const onSubmit = (data: FormSubmission) => {
    submit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>React Hook Form</h3>
      <FormField id="rhf-name" label="Name" error={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} id="rhf-name" />}
        />
      </FormField>

      <FormField id="rhf-gender" label="Gender" error={errors.gender?.message}>
        <GenderSelect id="rhf-gender" {...register('gender')} />
      </FormField>

      <FormField id="rhf-email" label="Email" error={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} id="rhf-email" />}
        />
      </FormField>

      <FormField
        id="rhf-acceptTerms"
        label="Accept Terms and Conditions"
        error={errors.acceptTerms?.message}
      >
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <input
              {...field}
              type="checkbox"
              id="rhf-acceptTerms"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
      </FormField>

      <Button type="submit">Save</Button>
    </form>
  );
};
