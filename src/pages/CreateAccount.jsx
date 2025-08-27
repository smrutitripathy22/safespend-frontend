import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import loginImage from "../assets/login.png";

import { userRegistration } from "../api/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (name, value, allValues) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Enter a valid email";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (!passwordRegex.test(value))
          return "Min 8 chars, include uppercase, lowercase, number & symbol";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== (allValues?.password ?? ""))
          return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (values) => {
    const nextErrors = {};
    Object.keys(values).forEach((key) => {
      if (
        [
          "firstName",
          "lastName",
          "email",
          "password",
          "confirmPassword",
        ].includes(key)
      ) {
        const msg = validateField(key, values[key], values);
        if (msg) nextErrors[key] = msg;
      }
    });
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const msg = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    userRegistration(
      formData,
      (data) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
      },
      (error) => console.error(error)
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#e5f0ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt="Login Illustration"
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            color: "#151e4d",
            gap: 1,
            alignItems: "center",
            padding: 1,
            justifyContent: "flex-end",
          }}
        >
          <Box
            component="img"
            src={'icon1.png'}
            alt="custom icon"
            sx={{ width: 24, height: 24 }}
          />
          <Typography fontWeight="bold">Safe Spend</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{ width: "100%", maxWidth: 650 }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Create an Account
            </Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Join to manage your wallet, set monthly budgets, track spending,
              and get personalized insights — all in one place.
            </Typography>

            {/* Name Fields */}
            <Stack direction="row" spacing={1} mb={1.5} mt={1.5}>
              <Box flex={1}>
                <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                  First Name<span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  size="small"
                  placeholder="First"
                  fullWidth
                />
              </Box>

              <Box flex={1}>
                <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                  Middle Name
                </Typography>
                <TextField
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  size="small"
                  placeholder="Middle"
                  fullWidth
                />
              </Box>

              <Box flex={1}>
                <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                  Last Name<span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  size="small"
                  placeholder="Last"
                  fullWidth
                />
              </Box>
            </Stack>

            <Box mb={1.5}>
              <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                Email<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email)}
                helperText={errors.email}
                size="small"
                placeholder="Enter your email"
                fullWidth
              />
            </Box>

            <Box mb={1.5}>
              <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                Password<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password)}
                helperText={errors.password}
                type="password"
                size="small"
                placeholder="Enter your password"
                fullWidth
              />
            </Box>

            <Box mb={1.5}>
              <Typography variant="subtitle2" sx={{ mb: 0.2 }}>
                Confirm Password<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                type="password"
                size="small"
                placeholder="Confirm your password"
                fullWidth
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              size="small"
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link component={RouterLink} to="/" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
