import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, type Resolver, useForm } from 'react-hook-form';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { type FormSubmission } from '../../store/slices/formSubmissionsSlice';
import { CountryAutocomplete } from './CountryAutocomplete/CountryAutocomplete';
import { FormField } from './FormField/FormField';
import { GenderSelect } from './GenderSelect/GenderSelect';
import { useFileUpload } from './hooks/useFileUpload';
import { useFormSubmission } from './hooks/useFormSubmission';
import { PasswordStrength } from './PasswordStrength/PasswordStrength';
import { schema } from './schema';

import styles from './Form.module.css';

interface IFormProps {
  onSave?: () => void;
}

interface FormValues extends Omit<FormSubmission, 'id' | 'timestamp'> {
  confirmPassword: string;
}

export const HookForm = ({ onSave }: IFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: '',
      acceptTerms: false,
      image: '',
      country: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { submit } = useFormSubmission(onSave);

  const onSubmit = (data: FormValues) => {
    const { confirmPassword: _, ...submissionData } = data;
    submit(submissionData);
    reset();
  };

  const { processFile, fileError } = useFileUpload();
  const [imagePreview, setImagePreview] = useState('');

  const passwordValue = watch('password', '');

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
      <FormField id="rhf-age" label="Age" error={errors.age?.message}>
        <Controller
          name="age"
          control={control}
          render={({ field }) => <Input {...field} id="rhf-age" />}
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
      <FormField
        id="rhf-image"
        label="Image"
        error={errors.image?.message || fileError || undefined}
      >
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value: _value, ...field } }) => (
            <input
              {...field}
              id="rhf-image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={async (e) => {
                const file = e.target.files?.[0] ?? null;
                const base64 = file ? await processFile(file) : '';
                onChange(base64 ?? '');
                setImagePreview(base64 ?? '');
              }}
            />
          )}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="image Preview"
            className={styles.imagePreview}
          ></img>
        )}
      </FormField>

      <FormField
        id="rhf-country"
        label="Country"
        error={errors.country?.message}
      >
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Please select a country' }}
          render={({ field }) => (
            <CountryAutocomplete id="rhf-country" {...field} />
          )}
        />
      </FormField>

      <FormField
        id="rhf-password"
        label="Password"
        error={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input {...field} id="rhf-password" />}
        />
      </FormField>

      <PasswordStrength password={passwordValue} />

      <FormField
        id="h-confirm"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      >
        <input
          id="h-confirm"
          type="password"
          {...register('confirmPassword')}
        />
      </FormField>

      <Button type="submit" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};
