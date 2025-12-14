import React from "react";
import { Box, Button, Link, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios"; 
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations/LoginShema.js";



export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema), mode: "onBlur"
  });

  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Login",
        values
      );
      console.log(response);
    } catch (e) {
       console.log("SERVER ERROR:", e.response?.data);
    }
  };

  return (
    <Box
      className="login-form"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(loginForm)}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
       
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
            color: "#000",
          }}
        >
         Login
        </Typography>

        {/* Form Inputs */}
        <TextField
          fullWidth
          label="Email"
          {...register("email", { required: true })}
          type="email"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.email} helperText={ errors.email?errors.email.message:""}
        />
        <TextField
          fullWidth
          label="Password"
          {...register("password", { required: true })}
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.password} helperText={ errors.password?errors.password.message:""}
        />
        <Box sx={{ textAlign: "right", mb: 3, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 0.5 }}>
  <LockOpenIcon  sx={{ fontSize: 16, color: "#888" }} />
  <Link
    href="/forget-password"
    sx={{
      fontSize: "14px",
      textDecoration: "none",
      color: "#888",
      "&:hover": { color: "#000", textDecoration: "underline" },
      fontWeight: "bold",
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
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
         Login
        </Button>

        
       <Typography sx={{ textAlign: "center", mt: 2, color: "#444" }}>
  Don't have an account?{" "}
  <Link   component={RouterLink}
    to="/register"
    style={{
      textDecoration: "none",
      color: "#000",
      fontWeight: "bold",
    }}
  >
    Sign Up
  </Link>
</Typography>

      </Box>
    </Box>
  );
}
