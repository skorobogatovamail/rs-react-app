import { useState } from 'react';

import { fileToBase64 } from '../utils/fileToBase64';
import { validateImageFile } from '../utils/validateImageFile';

export const useFileUpload = () => {
  const [fileError, setFileError] = useState<string | null>(null);

  const processFile = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    const error = validateImageFile(file);

    if (error) {
      setFileError(error);
      return null;
    }

    setFileError(null);
    return fileToBase64(file);
  };

  return { processFile, fileError };
};
