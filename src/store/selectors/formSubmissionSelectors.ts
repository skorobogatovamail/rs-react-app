import type { RootState } from '../store';

export const selectFormSubmissions = (state: RootState) =>
  state.formSubmissions.formSubmissions;
