import { K_HAS_REMINDER } from '@gs/modules/shared/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type ScreenTimeReminder = {
  seconds: number;
  hasReminder: boolean;
};

const useMutateReminder = () => {
  const qClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ seconds, hasReminder }: ScreenTimeReminder) => {
      const reminder: ScreenTimeReminder = {
        seconds,
        hasReminder,
      };
      await AsyncStorage.setItem(K_HAS_REMINDER, JSON.stringify(reminder));
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ['screen-time-reminder'],
      });
    },
  });
};

export default useMutateReminder;
