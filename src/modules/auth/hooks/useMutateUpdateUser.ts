import { type UserSchema } from '../schema';
import { useMutation } from '@tanstack/react-query';
import axios from '@gs/lib/axios';

const useMutateUpdateUser = () => {
  return useMutation<unknown, unknown, { userId: string; data: Partial<UserSchema> }>({
    mutationFn: async ({ userId, data }) => {
      const response = await axios.request<UserSchema>({
        method: 'PATCH',
        url: `users/${userId}`,
        data,
      });

      return response.data;
    },
    mutationKey: ['updateUser'],
  });
};

export default useMutateUpdateUser;
