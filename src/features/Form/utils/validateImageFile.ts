const ALLOWED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_SIZE = 5 * 1024 * 1024;

export const validateImageFile = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only PNG and JPEG are allowed';
  }

  if (file.size > MAX_SIZE) {
    return 'File size must be less than 5 MB';
  }
  return null;
};
