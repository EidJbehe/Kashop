import * as yup from "yup";

 export const Registerschema = yup.object({
  userName: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z0-9_-]{3,15}$/, "Invalid username")
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(16, "Username cannot exceed 16 characters"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters.")
    .matches(/\d/, "Password must have at least one digit ('0'-'9')."),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});
