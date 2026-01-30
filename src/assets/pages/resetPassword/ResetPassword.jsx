import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useResetPassword from "../../../hooks/useResetPassword";
import { ResetPasswordSchema } from '../../validations/ResetPasswordSchema';
import { useTranslation } from "react-i18next";


export default function ResetPassword() {
    const { t, i18n } = useTranslation();
  
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";


  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: emailFromState },
  });
  const { serverErrors, resetPasswordMutation } = useResetPassword();
  const resetPasswordForm =  (data) => {
     resetPasswordMutation.mutate(data);
    
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(resetPasswordForm)}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 5,
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            color: '#000',
            letterSpacing: 1,
          }}
        >
          {t('reset_password')}
        </Typography>

        {/* Server Errors */}
        {serverErrors.length > 0 && (
          <Box
            sx={{
              mb: 3,
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
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 4 }}
        />
        <TextField
          fullWidth
          label="Verification Code"
          {...register('code')}
          error={!!errors.code}
          helperText={errors.code?.message}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          {...register('newPassword')}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={{ mb: 3 }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          disabled={resetPasswordMutation.isLoading}
          variant="contained"
          sx={{
            py: 1.8,
            backgroundColor: '#000',
            '&:hover': { backgroundColor: '#333' },
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            textTransform: 'none',
          }}
        >
          {resetPasswordMutation.isLoading ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Update Password'
          )}
        </Button>
      </Box>
    </Box>
  );
}
