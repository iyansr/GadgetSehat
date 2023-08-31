import { useQuery } from '@tanstack/react-query';
import axios from '@gs/lib/axios';

type News = {
  link: string;
  title: string;
  imageURL: string;
  id: string;
};

const useQueryNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await axios.request<News[]>({
        method: 'GET',
        url: 'news',
      });

      return response.data;
    },
  });
};

export default useQueryNews;
