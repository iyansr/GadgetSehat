import { getTimeSpent } from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';

type Params = {
  dateList: {
    start: number;
    end: number;
  }[];
};

const useQueryScreenTimeChart = ({ dateList }: Params) => {
  return useQuery({
    queryKey: ['screen-time-chart-data', dateList],
    queryFn: async () => {
      const result = await Promise.all(
        dateList.map(async ({ start, end }) => {
          const data = await getTimeSpent(end, start);
          return {
            start,
            end,
            timeSpent: data.timeSpent,
            packageList: data.packageList,
          };
        }),
      );

      return result;
    },
    keepPreviousData: true,
  });
};

export default useQueryScreenTimeChart;
