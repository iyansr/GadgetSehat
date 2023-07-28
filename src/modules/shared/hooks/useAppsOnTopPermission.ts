import { checkAppsOnTopPermissionAccess } from '@gs/lib/native/apps-on-top/appsOnTop';
import { useQuery } from '@tanstack/react-query';

const useAppsOnTopPermission = () => {
  return useQuery<unknown, unknown, boolean>({
    queryKey: ['app-top-permission'],
    queryFn: async () => {
      const isPermitted = await checkAppsOnTopPermissionAccess();
      return isPermitted;
    },
    initialData: false,
  });
};

export default useAppsOnTopPermission;
