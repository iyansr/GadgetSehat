import { useQuery } from '@tanstack/react-query';

export type City = {
  id: string;
  name: string;
  province_id: string;
};

const useQueryCities = (provinceId?: string) => {
  return useQuery<unknown, unknown, City[]>({
    queryKey: ['list-city', provinceId],
    queryFn: async () => {
      const result = await fetch(
        `https://iyansr.github.io/api-wilayah-indonesia/static/api/regencies/${provinceId}.json`,
      );
      const json = await result.json();
      return json as City[];
    },
    enabled: !!provinceId,
  });
};

export default useQueryCities;
