import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { FormField } from './FormField/FormField';
import { GenderSelect } from './GenderSelect/GenderSelect';
import { useFileUpload } from './hooks/useFileUpload';
import { useFormSubmission } from './hooks/useFormSubmission';
import { getFormStringValue } from './utils/getFormStringValue';

import styles from './Form.module.css';

interface IFormProps {
  onSave?: () => void;
}

export const UncontrolledForm = ({ onSave }: IFormProps) => {
  const { submit } = useFormSubmission(onSave);
  const { processFile, fileError } = useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const file = formData.get('image') as File;
    const imageBase64 = file ? await processFile(file) : '';

    if (file?.size && !imageBase64) return;

    submit({
      name: getFormStringValue(formData, 'name'),
      age: getFormStringValue(formData, 'age'),
      email: getFormStringValue(formData, 'email'),
      gender: getFormStringValue(formData, 'gender'),
      acceptTerms: formData.get('acceptTerms') === 'on',
      image: imageBase64 ?? '',
      // country: getFormStringValue(formData, 'country'),
    });

    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Uncontrolled Form</h3>

      <FormField id="uncontrolled-name" label="Name">
        <Input id="uncontrolled-name" name="name" />
      </FormField>
      <FormField id="uncontrolled-age" label="Age">
        <Input id="uncontrolled-age" name="age" type="number" />
      </FormField>
      <FormField id="uncontrolled-email" label="Email">
        <Input id="uncontrolled-email" name="email" type="email" />
      </FormField>
      <FormField id="uncontrolled-gender" label="Gender">
        <GenderSelect id="uncontrolled-gender" name="gender" />
      </FormField>
      <FormField
        id="uncontrolled-acceptTerms"
        label="Accept Terms and Conditions"
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
        error={fileError ?? undefined}
      >
        <input
          id="uncontrolled-image"
          type="file"
          accept="image/png, image/jpeg"
          name="image"
        />
      </FormField>

      <Button type="submit">Save</Button>
    </form>
  );
};
