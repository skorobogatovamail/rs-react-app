export const getErrorMessage = (
  error: unknown,
  message?: string
): string | null => {
  if (!error) return null;
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return message ? message : 'Failed to fetch characters';
  }
  return 'An unknown error occurred';
};
