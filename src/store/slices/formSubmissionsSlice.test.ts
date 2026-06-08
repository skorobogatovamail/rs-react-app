import { describe, expect, it } from 'vitest';

import { addSubmission, formSubmissionsSlice } from './formSubmissionsSlice';

describe('formSubmissionsSlice', () => {
  it('should handle addSubmission', () => {
    const initialState = { formSubmissions: [] };
    const mockData = {
      name: 'John',
      age: '25',
      email: 'john@example.com',
      gender: 'male',
      acceptTerms: true,
      image: 'base64-string',
      country: 'USA',
      password: 'Password1!',
    };

    const newState = formSubmissionsSlice.reducer(
      initialState,
      addSubmission(mockData)
    );

    expect(newState.formSubmissions).toHaveLength(1);
    expect(newState.formSubmissions[0]).toMatchObject(mockData);
    expect(newState.formSubmissions[0].id).toBeDefined();
    expect(newState.formSubmissions[0].timestamp).toBeLessThanOrEqual(
      Date.now()
    );
  });
});
