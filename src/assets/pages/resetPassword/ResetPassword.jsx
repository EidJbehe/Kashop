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

const ResetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  code: yup.string().required("Verification code is required"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters.")
    .matches(/\d/, "Password must have at least one digit ('0'-'9')."),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [serverErrors, setServerErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: emailFromState },
  });

  const resetPasswordForm = async (data) => {
    setServerErrors([]);
    try {
      await axios.patch(
        "https://knowledgeshop.runasp.net/api/Auth/Account/ResetPassword",
        { email: data.email, code: data.code, newPassword: data.newPassword }
      );
      navigate("/login");
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const serverErrorsArray = error.response?.data?.errors;

      if (serverErrorsArray && Array.isArray(serverErrorsArray)) {
        setServerErrors(serverErrorsArray);
      } else if (serverMessage) {
        setServerErrors([serverMessage]);
      } else {
        setServerErrors(["Something went wrong"]);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(resetPasswordForm)}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "#000",
            letterSpacing: 1,
          }}
        >
          Reset Password
        </Typography>

        {/* Server Errors */}
        {serverErrors.length > 0 && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#fdecea",
              border: "1px solid #f5c2c7",
            }}
          >
            {serverErrors.map((error, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <ErrorOutlineIcon sx={{ color: "#d32f2f", mr: 1 }} />
                <Typography sx={{ color: "#d32f2f" }}>{error}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Form Inputs */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 4 }}
        />
        <TextField
          fullWidth
          label="Verification Code"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={{ mb: 3 }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          sx={{
            py: 1.8,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            textTransform: "none",
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Update Password"
          )}
        </Button>
      </Box>
    </Box>
  );
}
