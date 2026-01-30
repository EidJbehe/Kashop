import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/axiosInstance';

export const useFetch = (queryKey,url,instance=axiosInstance) => {
  const fetchData = async () => {
      const response = await instance.get(url);
     
        return response.data?? null; 
      
  };
  const query = useQuery({
    queryKey: queryKey,
    staleTime: 5 * 60 * 1000,
    queryFn: fetchData,
  });
  return query;
};
