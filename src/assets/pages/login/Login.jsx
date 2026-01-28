import React from 'react';
import { Box, Button, Link, Typography, TextField, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../validations/LoginSchema.js';
import useLogin from '../../../hooks/useLogin.js';

export default function Login() {
  const { serverErrors, loginMutation } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
  });

  const loginForm = async (values) => {
    await loginMutation.mutateAsync(values);
  };

  return (
    <Box
      className="login-form"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(loginForm)}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', color: '#000' }}
        >
          Login
        </Typography>

        {serverErrors.length > 0 && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#fdecea',
              border: '1px solid #f5c2c7',
            }}
          >
            {serverErrors.map((error, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ErrorOutlineIcon sx={{ color: '#d32f2f', mr: 1 }} />
                <Typography sx={{ color: '#d32f2f' }}>{error}</Typography>
              </Box>
            ))}
          </Box>
        )}

        <TextField
          fullWidth
          label="Email"
          {...register('email')}
          type="email"
          variant="outlined"
          sx={{ mb: 2 }}
          error={!!errors.email}
          helperText={errors.email?.message || ''}
        />

        <TextField
          fullWidth
          label="Password"
          {...register('password')}
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          error={!!errors.password}
          helperText={errors.password?.message || ''}
        />

        <Box
          sx={{
            textAlign: 'right',
            mb: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <LockOpenIcon sx={{ fontSize: 16, color: '#888' }} />
          <Link
            component={RouterLink}
            to="/SendCode"
            sx={{
              fontSize: '14px',
              textDecoration: 'none',
              color: '#888',
              '&:hover': { color: '#000', textDecoration: 'underline' },
              fontWeight: 'bold',
            }}
          >
            Forget Password?
          </Link>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            py: 1.6,
            backgroundColor: '#000',
            '&:hover': { backgroundColor: '#333' },
            fontSize: '16px',
            textTransform: 'none',
            borderRadius: '8px',
          }}
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Login'
          )}
        </Button>

        <Typography sx={{ textAlign: 'center', mt: 2, color: '#444' }}>
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/register"
            style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
