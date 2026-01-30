import React, { useState } from 'react';
import { Box, Button, Link, Typography, TextField, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Registerschema } from '../../validations/RegisterSchema.js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useRegister from '../../../hooks/useRegister.js';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t, i18n } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(Registerschema),
    mode: 'onBlur',
  });

  const { serverErrors, registerMutation }=useRegister();  
  const registerForm = async (values) => {
   await registerMutation.mutate(values);
   
  };

  return (
    <Box
      className="register-form"
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
        onSubmit={handleSubmit(registerForm)}
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
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            color: '#000',
          }}
        >
          {t('Sign_up')}
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

        {/* Form Inputs */}
        <TextField
          fullWidth
          label={t('User_Name')} 
          {...register('userName')}
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.userName}
          helperText={errors.userName ? errors.userName.message : ''}
        />
        <TextField
          fullWidth
          label={t('Full_Name')}
          {...register('fullName')}
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.fullName}
          helperText={errors.fullName ? errors.fullName.message : ''}
        />
        <TextField
          fullWidth
          label={t('Email')}
          {...register('email')}
          type="email"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          fullWidth
          label={t('Password')}
          {...register('password')}
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <TextField
          fullWidth
          label={t('Phone_Number')}
          {...register('phoneNumber')}
          type="tel"
          variant="outlined"
          sx={{ mb: 3 }}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
        />

        {/* Submit Button */}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('Sign_up')}
        </Button>

        <Typography sx={{ textAlign: 'center', mt: 2, color: '#444' }}>
          {t('already_have_account')}{' '}
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {t('Login')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
