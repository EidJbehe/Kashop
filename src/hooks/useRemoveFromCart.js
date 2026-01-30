import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const removeFromCartMutation = useMutation({
    mutationFn: async (cardItemId) => {
      return await axiosAuthInstance.delete(`/Carts/${cardItemId}`);
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });

  return removeFromCartMutation;
}

