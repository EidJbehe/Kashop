import React from "react";
import { Box, Button, Link, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Registerschema } from "../../validations/RegisterSchema.js";


export default function Register() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(Registerschema),mode: "onBlur"
  });

  const registerForm = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Register",
        values
      );
      console.log(response);
    } catch (e) {
      console.log("SERVER ERROR:", e.response?.data);
    }
  };

  return (
    <Box
      className="register-form"
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
        onSubmit={handleSubmit(registerForm)}
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
          Sign Up
        </Typography>

        {/* Form Inputs */}
        <TextField
          fullWidth
          label="User Name"
          {...register("userName")}
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.userName} helperText={ errors.userName?errors.userName.message:""}
        />
        <TextField
          fullWidth
          label="Full Name"
          {...register("fullName")}
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.fullName} helperText={errors.fullName ? errors.fullName.message : ""}
        />
        <TextField
          fullWidth
          label="Email"
          {...register("email")}
          type="email"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.email} helperText={errors.email ? errors.email.message : ""}

        />
        <TextField
          fullWidth
          label="Password"
          {...register("password")}
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          error={errors.password} helperText={errors.password ? errors.password.message : ""}

        />
        <TextField
          fullWidth
          label="Phone Number"
          {...register("phoneNumber")}
          type="tel"
          variant="outlined"
          sx={{ mb: 3 }}
          error={errors.phoneNumber} helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}

        />

        {/* Submit Button */}
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
          Sign Up
        </Button>

        <Typography sx={{ textAlign: "center", mt: 2, color: "#444" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
