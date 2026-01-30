import React from 'react';
import axiosAuthInstance from '../Api/axiosAuthInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const updateCountMutation = useMutation({
      mutationFn: async ({ productId, count }) => {
      return await axiosAuthInstance.patch(`/Carts/${productId}`, { count });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  return updateCountMutation;
}
