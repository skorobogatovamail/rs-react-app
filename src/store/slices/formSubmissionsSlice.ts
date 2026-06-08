import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormSubmission {
  id: string;
  timestamp: number;
  name: string;
  age: string;
  email: string;
  gender: string;
  acceptTerms: boolean;
  image: string;
  country: string;
  password: string;
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
    addSubmission: (
      state,
      action: PayloadAction<Omit<FormSubmission, 'id' | 'timestamp'>>
    ) => {
      const newSubmission: FormSubmission = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      state.formSubmissions = [...state.formSubmissions, newSubmission];
    },
  },
});

export const { addSubmission } = formSubmissionsSlice.actions;
