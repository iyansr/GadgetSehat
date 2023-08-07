import { useQuery } from '@tanstack/react-query';
import { PermissionsAndroid } from 'react-native';

const useNotificationPermission = () => {
  return useQuery<unknown, unknown, boolean>({
    queryKey: ['notification-permission'],
    queryFn: async () => {
      const isPermitted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return isPermitted;
    },
    initialData: false,
  });
};

export default useNotificationPermission;
