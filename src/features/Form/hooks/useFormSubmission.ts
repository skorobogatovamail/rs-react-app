import { useAppDispatch } from '../../../store/hooks';
import {
  addSubmission,
  type FormSubmission,
} from '../../../store/slices/formSubmissionsSlice';

export const useFormSubmission = (onSave?: () => void) => {
  const dispatch = useAppDispatch();

  const submit = (data: Omit<FormSubmission, 'id' | 'timestamp'>) => {
    dispatch(addSubmission(data));
    onSave?.();
  };

  return { submit };
};
