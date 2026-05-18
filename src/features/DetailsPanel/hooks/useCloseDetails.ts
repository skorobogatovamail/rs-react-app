import { useNavigate, useSearchParams } from 'react-router';

export const useCloseDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleCloseDetails = () => {
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  return handleCloseDetails;
};
