import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormLabel,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import loginImage from "../assets/login.png";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { userLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../reducer/authSlice";
const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(
      loginData,
      (data) =>{
        const {firstName,middleName,lastName,email,kycStatus}=data
        dispatch(login({
        user: { firstName,middleName,lastName,email,kycStatus },
        token: data.token,
      }))
      navigate("/dashboard")
      },
      (error) => console.log(error)
    );
  };

  return (
    <Box sx={{ height: "99vh", display: "flex", flexDirection: "row" }}>
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
          sx={{
            width: "100%",
            height: "100%",
          }}
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
          <Typography fontWeight={"bold"}>Safe Spend</Typography>
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
            elevation={0}
            sx={{ width: "100%", maxWidth: 650 }}
            component={"form"}
            onSubmit={handleLogin}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Please enter your details
            </Typography>

            <Box mb={1.5}>
              <FormLabel required>Email</FormLabel>
              <TextField
                size="small"
                required
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((ps) => ({ ...ps, email: e.target.value }))
                }
                fullWidth
              />
            </Box>

            <Box mb={1.5}>
              <FormLabel required>Password</FormLabel>
              <TextField
                size="small"
                placeholder="Enter your password"
                fullWidth
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((ps) => ({ ...ps, password: e.target.value }))
                }
                type="password"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <Link href="#" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              size="small"
            >
              Login
            </Button>

            <Box mt={3}>
              <Typography variant="caption" color="text.secondary">
                Don’t have an account?{" "}
                <Link
                  sx={{ fontWeight: "bold" }}
                  component={RouterLink}
                  to="/signup"
                  underline="hover"
                >
                  Sign Up
                </Link>{" "}
                to manage your wallet, set monthly budgets, track spending, and
                get personalized insights — all in one place.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
