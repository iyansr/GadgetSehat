import { getTimeSpent } from '@gs/lib/native/screentime/screentime';
import { useQuery } from '@tanstack/react-query';

const useQueryTotalScreenTime = (start = 0, end = 0) => {
  return useQuery({
    queryKey: ['screen-time-list', start, end],
    queryFn: async () => {
      const result = await getTimeSpent(start, end);
      return {
        ...result,
        packageList: result.packageList.sort((a, b) => b.usageTime - a.usageTime),
      };
    },
    keepPreviousData: true,
  });
};

export default useQueryTotalScreenTime;
