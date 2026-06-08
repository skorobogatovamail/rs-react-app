import { useState } from 'react';
import { ValidationError } from 'yup';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import type { FormSubmission } from '../../store/slices/formSubmissionsSlice';
import { CountryAutocomplete } from './CountryAutocomplete/CountryAutocomplete';
import { FormField } from './FormField/FormField';
import { GenderSelect } from './GenderSelect/GenderSelect';
import { useFileUpload } from './hooks/useFileUpload';
import { useFormSubmission } from './hooks/useFormSubmission';
import { PasswordStrength } from './PasswordStrength/PasswordStrength';
import { schema } from './schema';
import { getFormStringValue } from './utils/getFormStringValue';

import styles from './Form.module.css';

interface IFormProps {
  onSave?: () => void;
}

export const UncontrolledForm = ({ onSave }: IFormProps) => {
  const { submit } = useFormSubmission(onSave);
  const { processFile, fileError } = useFileUpload();
  const [password, setPassword] = useState('');

  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get('password') !== formData.get('confirmPassword')) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      const file = formData.get('image') as File;
      const imageBase64 = file ? await processFile(file) : '';

      const validatedData = await schema.validate(
        {
          name: getFormStringValue(formData, 'name'),
          age: getFormStringValue(formData, 'age'),
          email: getFormStringValue(formData, 'email'),
          gender: getFormStringValue(formData, 'gender'),
          acceptTerms: formData.get('acceptTerms') === 'on',
          image: imageBase64,
          country: getFormStringValue(formData, 'country'),
          password: getFormStringValue(formData, 'password'),
          confirmPassword: getFormStringValue(formData, 'confirmPassword'),
        },
        { abortEarly: false }
      );

      const { confirmPassword: _, ...submissionData } =
        validatedData as Required<typeof validatedData>;
      submit(submissionData as Omit<FormSubmission, 'id' | 'timestamp'>);
      form.reset();
      setPassword('');
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.inner.reduce<Record<string, string>>(
          (acc, current) => {
            if (current.path) {
              acc[current.path] = current.message;
            }
            return acc;
          },
          {}
        );
        setValidationErrors(errors);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Uncontrolled Form</h3>

      <FormField
        id="uncontrolled-name"
        label="Name"
        error={validationErrors.name}
      >
        <Input id="uncontrolled-name" name="name" />
      </FormField>
      <FormField id="uncontrolled-age" label="Age" error={validationErrors.age}>
        <Input id="uncontrolled-age" name="age" type="number" />
      </FormField>
      <FormField
        id="uncontrolled-email"
        label="Email"
        error={validationErrors.email}
      >
        <Input id="uncontrolled-email" name="email" type="email" />
      </FormField>
      <FormField
        id="uncontrolled-gender"
        label="Gender"
        error={validationErrors.gender}
      >
        <GenderSelect id="uncontrolled-gender" name="gender" />
      </FormField>
      <FormField
        id="uncontrolled-acceptTerms"
        label="Accept Terms and Conditions"
        error={validationErrors.acceptTerms}
      >
        <input
          id="uncontrolled-acceptTerms"
          name="acceptTerms"
          type="checkbox"
        />
      </FormField>

      <FormField
        id="uncontrolled-image"
        label="Image"
        error={fileError || validationErrors.image}
      >
        <input
          id="uncontrolled-image"
          type="file"
          accept="image/png, image/jpeg"
          name="image"
        />
      </FormField>

      <FormField
        id="uncontrolled-country"
        label="Country"
        error={validationErrors.country}
      >
        <CountryAutocomplete id="uncontrolled-country" name="country" />
      </FormField>

      <FormField
        id="uncontrolled-password"
        label="password"
        error={validationErrors.password}
      >
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>

      <PasswordStrength password={password} />
      <FormField
        id="uncontrolled-confirm-password"
        label="Confirm Password"
        error={confirmPasswordError}
      >
        <input
          id="uncontrolled-confirm-password"
          name="confirmPassword"
          type="password"
        />
      </FormField>

      <Button type="submit">Save</Button>
    </form>
  );
};
