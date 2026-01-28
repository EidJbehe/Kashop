import * as yup from 'yup';
import ResetPassword from '../pages/resetPassword/ResetPassword';

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  code: yup.string().required('Verification code is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters.')
    .matches(/\d/, "Password must have at least one digit ('0'-'9')."),
});
