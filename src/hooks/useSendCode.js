import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";
import { useMutation } from "@tanstack/react-query";



export default function useSendCode() {
     const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();
    const sendCodeMutation = useMutation({
        mutationFn: async (data) => {
            return await axiosInstance.post(
                "/Auth/Account/SendCode",
                { email: data.email }
            );
        },
        onSuccess: (response, variables) => {
            navigate('/resetPassword', { state: { email: variables.email } });
        },
        onError: (error) => {
            setServerErrors([error.response?.data?.message || 'Something went wrong']);
        }

        

    });
    return {serverErrors,sendCodeMutation };
 }