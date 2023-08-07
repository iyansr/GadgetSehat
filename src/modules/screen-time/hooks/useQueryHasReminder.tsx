import { K_HAS_REMINDER } from '@gs/modules/shared/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

export type ScreenTimeReminder = {
  seconds: number;
  hasReminder: boolean;
};

const useQueryHasReminder = () => {
  return useQuery({
    queryKey: ['screen-time-reminder'],
    queryFn: async () => {
      const defaultReminder: ScreenTimeReminder = {
        seconds: 0,
        hasReminder: false,
      };
      const reminderData = await AsyncStorage.getItem(K_HAS_REMINDER);
      const reminder: ScreenTimeReminder = reminderData
        ? JSON.parse(reminderData)
        : defaultReminder;

      return reminder;
    },
  });
};

export default useQueryHasReminder;
