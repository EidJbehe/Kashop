import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useAddToCart() {
    const queryClient= useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async (valuse) => {
      return await axiosAuthInstance.post('/Carts', {
        ProductId: valuse.productId,
        Count: valuse.count,
      });
    },
    onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  return addToCartMutation;
}
