import * as yup from 'yup';

import { COUNTRIES } from '../../store/slices/countriesSlice';

const countryNames = COUNTRIES.map((c) => c.name);

export const schema = yup
  .object({
    name: yup
      .string()
      .required()
      .matches(/^[A-Z]/, 'First letter must be uppercase'),
    age: yup.string().required(),
    email: yup
      .string()
      .required('Email is required')
      .test('email-basic-validation', 'Invalid email format', (value) => {
        if (!value) return false;

        const parts = value.split('@');
        if (parts.length !== 2) return false;

        const localPart = parts[0];
        const domainPart = parts[1];

        if (localPart.length === 0) return false;

        const domainParts = domainPart.split('.');
        if (domainParts.length < 2) return false;

        const hasEmptyDomainPart = domainParts.some(
          (part) => part.length === 0
        );
        if (hasEmptyDomainPart) return false;

        return true;
      }),
    gender: yup.string().required(),
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept Terms and Conditions')
      .required(),
    image: yup.string().required('Image is required'),
    country: yup
      .string()
      .required('Country is required')
      .oneOf(countryNames, 'Please select a country from the list'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required();
