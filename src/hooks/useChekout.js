import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosAuthInstance from "../Api/axiosAuthInstance";


export default function useChekout() { 
    const queryClient = useQueryClient();

const chekoutMutation = useMutation({
    mutationFn: async (paymentMethod) => { 
        return await axiosAuthInstance.post('/Checkouts', { PaymentMethod: paymentMethod }
        );
        
    },
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['carts'] });
    }

})
    return chekoutMutation
}