import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/axiosInstance';
import { useFetch } from './useFetch';
import i18n from '../i18n';

export const useCategories = () => {
  return useFetch(['categories', i18n.language], '/Categories');
  
};
