import ScreenTimeModule from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';

const useAppUsagePermission = () => {
  return useQuery<unknown, unknown, boolean>({
    queryKey: ['app-usage-permission'],
    queryFn: async () => {
      const isPermitted = await ScreenTimeModule.checkPermissionAccess();
      return isPermitted;
    },
    initialData: false,
  });
};

export default useAppUsagePermission;
