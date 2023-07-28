import { getTimeSpent } from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';
import { getUnixTime, startOfDay } from 'date-fns';

const useQueryTotalScreenTime = () => {
  return useQuery<unknown, unknown, number>({
    queryKey: ['Screen-time-today'],
    queryFn: async () => {
      const result = await getTimeSpent(0, Math.floor(getUnixTime(startOfDay(new Date())) * 1000));
      return result;
    },
  });
};

export default useQueryTotalScreenTime;
