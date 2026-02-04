import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useAddReview(productId) {
  const queryClient = useQueryClient();
  const addReviewMutation = useMutation({
    mutationFn: async (valuse) => {
      return await axiosAuthInstance.post(`/Products/${productId}/reviews`, {
        Rating: valuse.rating,
        Comment: valuse.comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`product-${productId}`] });
    },
  });

  return addReviewMutation;
}
       