import { getTimeSpent } from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';
import { getUnixTime, sub } from 'date-fns';

const useQueryScreenTimeChart = () => {
  return useQuery({
    queryKey: ['Screen-time-chart-data'],
    queryFn: async () => {
      const result = await Promise.all(
        [...new Array(7)].map(async (_, index) => {
          const start = Math.floor(getUnixTime(sub(new Date(), { days: index + 1 })) * 1000);
          const end = Math.floor(getUnixTime(sub(new Date(), { days: index })) * 1000);

          return {
            start,
            end,
            timeSpent: await getTimeSpent(end, start),
          };
        }),
      );

      return result;
    },
  });
};

export default useQueryScreenTimeChart;
