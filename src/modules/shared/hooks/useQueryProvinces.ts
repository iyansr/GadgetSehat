import { useQuery } from '@tanstack/react-query';

export type Province = {
  id: string;
  name: string;
};

const useQueryProvinces = () => {
  return useQuery<unknown, unknown, Province[]>({
    queryKey: ['list-province'],
    queryFn: async () => {
      const result = await fetch(
        'https://iyansr.github.io/api-wilayah-indonesia/static/api/provinces.json',
      );
      const json = await result.json();
      return json as Province[];
    },
  });
};

export default useQueryProvinces;
