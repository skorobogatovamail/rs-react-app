import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormSubmission {
  name: string;
  age: string;
  email: string;
  gender: string;
  acceptTerms: boolean;
}

interface FormSubmissionsSliceState {
  formSubmissions: FormSubmission[];
}

const initialState: FormSubmissionsSliceState = {
  formSubmissions: [],
};

export const formSubmissionsSlice = createSlice({
  name: 'formSubmissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormSubmission>) => {
      state.formSubmissions = [...state.formSubmissions, action.payload];
    },
  },
});

export const { addSubmission } = formSubmissionsSlice.actions;
