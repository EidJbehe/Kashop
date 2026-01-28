import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/axiosInstance';
import useAuthStore from '../assets/store/AuthStore';
import { jwtDecode } from 'jwt-decode';


export default function useLogin() {
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  

  const loginMutation = useMutation({
    mutationFn: (values) => axiosInstance.post('/Auth/Account/Login', values),
    onMutate: () => {
      setServerErrors([]);
    },
    onSuccess: (response) => {
      if (response.data && response.data.success) {
        setToken(response.data.accessToken);
        const accessToken = response.data.accessToken;
        const decoded = jwtDecode(accessToken);
        const user = {
          name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        };
        setUser(user);
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
