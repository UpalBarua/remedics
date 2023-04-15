import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const useUserData = () => {
  const { user } = useAuth();

  if (!user) return;

  const {
    data: userData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/user/?email=${user?.email}`
        );
        return data;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data.');
      }
    },
  });

  return { userData, isLoading, isError };
};

export default useUserData;
