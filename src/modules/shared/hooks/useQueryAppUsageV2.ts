import { getAppList, AppUsage } from '@gs/lib/native/screentime/screenTimeV2';
import { useQuery } from '@tanstack/react-query';

const fetchScreenTimeReport = async (start = 0, end = 0) => {
  const result = await getAppList(start, end);

  return result;
};

const useQueryAppUsageV2 = ({ start = 0, end = 0 }) => {
  return useQuery<unknown, unknown, AppUsage[]>({
    queryKey: ['app-usage-v2', { start, end }],
    queryFn: async () => {
      const result = await fetchScreenTimeReport(start, end);
      return result;
    },
  });
};

export default useQueryAppUsageV2;
