import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { type FormSubmission } from '../../store/slices/formSubmissionsSlice';
import { FormField } from './FormField/FormField';
import { GenderSelect } from './GenderSelect/GenderSelect';
import { useFileUpload } from './hooks/useFileUpload';
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
    image: yup.string().required('Image is required'),
    // country: yup.string().required('Country is required'),
  })
  .required();

export const HookForm = ({ onSave }: IFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      gender: '',
      acceptTerms: false,
      image: '',
      // country: '',
    },
  });

  const { submit } = useFormSubmission(onSave);

  const onSubmit = (data: FormSubmission) => {
    submit(data);
    reset();
  };

  const { processFile, fileError } = useFileUpload();
  const [imagePreview, setImagePreview] = useState('');

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
        error={errors.image?.message || fileError}
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

      <Button type="submit">Save</Button>
    </form>
  );
};
