import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/axiosInstance';
import { useFetch } from './useFetch';

export const useCategories = () => {
  return useFetch('categories', '/Categories');
  
};
