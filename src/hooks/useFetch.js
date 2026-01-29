import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/axiosInstance';

export const useFetch = (queryKey,url) => {
  const fetchData = async () => {
    const response = await axiosInstance.get(url);
    return response.data.response;
  };
  const query = useQuery({
    queryKey: [queryKey],
    staleTime: 5 * 60 * 1000,
    queryFn: fetchData,
  });
  return query;
};
