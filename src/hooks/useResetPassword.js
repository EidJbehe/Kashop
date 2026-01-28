import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";



export default function useResetPassword() { 
    const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();
    const resetPasswordMutation = useMutation({
        mutationFn:  (data) => {
            return  axiosInstance.patch(
              '/Auth/Account/ResetPassword',
              { email: data.email, code: data.code, newPassword: data.newPassword }
            );
        },
        onSuccess: () => {
             navigate('/login');
        },
        onError: (error) => {
            const serverMessage = error.response?.data?.message;
            const serverErrorsArray = error.response?.data?.errors;

            if (serverErrorsArray && Array.isArray(serverErrorsArray)) {
              setServerErrors(serverErrorsArray);
            } else if (serverMessage) {
              setServerErrors([serverMessage]);
            } else {
              setServerErrors(['Something went wrong']);
            }
        }
    });
return { serverErrors, resetPasswordMutation };

}