import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import loginImage from "../assets/login.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducer/authSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleLogin = urlParams.get("google");
    const token = urlParams.get("token");
    const userEncoded = urlParams.get("user");

    if (googleLogin === "success" && token && userEncoded) {
      try {
        const userJson = decodeURIComponent(userEncoded);
        const userData = JSON.parse(userJson);

        dispatch(
          login({
            token,
            user: userData,
          })
        );

        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to process Google login:", error);
      }

      // Clean query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch, navigate]);

 
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "row" }}>
     
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#e5f0ff",
          display: "flex",
          alignItems: "center",
       justifyContent:'flex-start',
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt="Login Illustration"
          sx={{
            width: "80%",
            height: "100%",
            
            objectFit: "cover", 
          }}
        />
      </Box>

      {/* Right side login card */}
      <Box sx={{   backgroundColor: "#e5f0ff",}}>
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
            sx={{ width: 24, height: 24 ,}}
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
          <Paper elevation={0} sx={{ width: "100%", maxWidth: 650, p: 4,   backgroundColor: "#e5f0ff", }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Welcome to Safe Spend
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Sign in with Google to continue
            </Typography>

            <Button
              
              color="info"
              fullWidth
              size="medium"
              onClick={handleGoogleLogin}
              sx={{display:'flex',gap:1}}
            >
               <img src="/google.png" alt="Google" height={'20px'} />
              Sign in with Google
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleLogin;
