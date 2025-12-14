import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SendCodeSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function SendCode() {
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SendCodeSchema),
    mode: "onBlur",
  });

  const sendCodeForm = async (data) => {
    setServerErrors([]);
    try {
      await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/SendCode",
        { email: data.email }
      );
      navigate("/resetPassword", { state: { email: data.email } });
    } catch (error) {
      setServerErrors([
        error.response?.data?.message || "Something went wrong",
      ]);
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
        onSubmit={handleSubmit(sendCodeForm)}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
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
          }}
        >
          Send Verification Code
        </Typography>

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

        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            mb: 4,
            "& .MuiInputLabel-root": { color: "#888" },
            "& .MuiOutlinedInput-root": {
              color: "#000",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#000" },
            "& .MuiFormHelperText-root": { color: "#f44336" },
          }}
        />

        <Button
          fullWidth
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          sx={{
            py: 1.6,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
            fontSize: "16px",
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "8px",
            mb: 2,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Send Code"
          )}
        </Button>
      </Box>
    </Box>
  );
}
