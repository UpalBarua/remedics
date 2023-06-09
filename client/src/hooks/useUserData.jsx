import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

import axios from '../api/axios';

const useUserData = () => {
  const { user } = useAuth();

  const {
    data: userData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/?email=${user.email}`);
        return data;
      } catch (error) {
        throw new Error('Failed to fetch data.');
      }
    },
  });

  return { userData, isLoading, isError };
};

export default useUserData;
