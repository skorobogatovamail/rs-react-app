import { useAppDispatch } from '../../../store/hooks';
import {
  addSubmission,
  type FormSubmission,
} from '../../../store/slices/formSubmissionsSlice';

export const useFormSubmission = (onSave?: () => void) => {
  const dispatch = useAppDispatch();

  const submit = (data: FormSubmission) => {
    dispatch(addSubmission(data));
    onSave?.();
  };

  return { submit };
};
