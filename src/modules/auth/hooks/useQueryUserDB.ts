import { useQuery } from '@tanstack/react-query';
import { UserSchema } from '../schema';
import useAuth from './useAuth';
import axios from '@gs/lib/axios';

const useQueryUserDB = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-db', user],
    queryFn: async () => {
      const response = await axios.request<UserSchema>({
        method: 'GET',
        url: `users/${user?.uid}`,
      });

      return response.data;
    },
    enabled: !!user,
  });
};

export default useQueryUserDB;
