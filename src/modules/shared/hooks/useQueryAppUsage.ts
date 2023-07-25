import {
  ScreenTimeData,
  ScreenTimeInterval,
  getScreenTime,
} from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';

export type City = {
  id: string;
  name: string;
  province_id: string;
};

const fetchScreenTimeReport = async (
  interval = ScreenTimeInterval.INTERVAL_BEST,
  start = 0,
  end = 0,
) => {
  const result = await getScreenTime(interval, start, end);

  const final: ScreenTimeData = {
    ...result,
    appUsageList: result.appUsageList.sort((a, b) => b.usageTime - a.usageTime).slice(0, 8),
  };

  return final;
};

const useQueryAppUsage = ({ start = 0, end = 0, interval = ScreenTimeInterval.INTERVAL_BEST }) => {
  return useQuery<unknown, unknown, ScreenTimeData>({
    queryKey: ['app-usage', { start, end, interval }],
    queryFn: async () => {
      const result = await fetchScreenTimeReport(interval, start, end);
      return result;
    },
  });
};

export default useQueryAppUsage;
