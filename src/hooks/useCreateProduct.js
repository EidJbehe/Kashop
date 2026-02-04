import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/axiosInstance';
import useAuthStore from '../assets/store/AuthStore';

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const { token } = useAuthStore();  

  const createProductMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/admin/Products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },

    onSuccess: () => {
      
      queryClient.invalidateQueries(['product']);
      setServerErrors([]);
      navigate('/Products');
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors ||
        error?.response?.data?.message || ['Something went wrong'];

      setServerErrors(Array.isArray(errors) ? errors : [errors]);
    },
  });

  return {
    createProductMutation,
    serverErrors,
  };
}
