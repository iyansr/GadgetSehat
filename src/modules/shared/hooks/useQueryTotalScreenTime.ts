import { getTotalScreenTime } from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';
import { getUnixTime, startOfDay } from 'date-fns';

const useQueryTotalScreenTime = () => {
  return useQuery<unknown, unknown, number>({
    queryKey: ['Screen-time'],
    queryFn: async () => {
      const result = await getTotalScreenTime(
        0,
        Math.floor(getUnixTime(startOfDay(new Date())) * 1000),
      );
      return result;
    },
  });
};

export default useQueryTotalScreenTime;
