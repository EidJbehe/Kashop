import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/axiosInstance';

export const useFetch = (queryKey, url, params = {}, instance = axiosInstance) => {
  const fetchData = async () => {
    const response = await instance.get(url, { params } );
    return response.data ?? null;
  };

  return useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};
