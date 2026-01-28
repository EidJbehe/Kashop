import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/axiosInstance';
import useAuthStore from '../assets/store/AuthStore';


export default function useLogin() {
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  

  const loginMutation = useMutation({
    mutationFn: (values) => axiosInstance.post('/Auth/Account/Login', values),
    onMutate: () => {
      setServerErrors([]);
    },
    onSuccess: (response) => {
      if (response.data && response.data.success) {
       setToken(response.data.accessToken);
        navigate('/home');
      } else {
        setServerErrors([response.data?.message || 'Login failed, please try again']);
      }
    },
    onError: (error) => {
      setServerErrors([error.response?.data?.message || 'Login failed, please try again']);
    },
  });

  return { serverErrors, loginMutation };
}
