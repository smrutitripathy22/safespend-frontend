import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { verifyPayement } from "../api/wallet";

const StripePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing payment...");
  const [success, setSuccess] = useState(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
      setStatus("Payment successful! Wallet updated.");
      setSuccess(true);
    if (sessionId) {
      verifyPayement(
        sessionId,
        () => {
        
        },
        () => setStatus("Error verifying payment")
      );
    }
  }, []);

  useEffect(() => {
    if (success === null) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(interval);
      navigate("/expense-tracking");
    }

    return () => clearInterval(interval);
  }, [success, countdown, navigate]);

  const getIcon = () => {
    if (success === null)
      return <HourglassEmptyIcon sx={{ fontSize: 80 }} color="action" />;
    return success ? (
      <CheckCircleIcon sx={{ fontSize: 80 }} color="success" />
    ) : (
      <ErrorIcon sx={{ fontSize: 80 }} color="error" />
    );
  };

  const bgColor =
    success === null ? "#f0f0f0" : success ? "#d4edda" : "#f8d7da";
  const textColor = success === null ? "#333" : success ? "#155724" : "#721c24";

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        textAlign: "center",
        bgcolor: bgColor,
        color: textColor,
        borderRadius: 3,
        p: 4,
        m: 4,
      }}
    >
      {getIcon()}
      <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
        {status}
      </Typography>
      {success && (
        <Typography variant="body1">
          Thank you! Your wallet has been topped up successfully.
        </Typography>
      )}
      {success === false && (
        <Typography variant="body1">
          Please try again or contact support if the problem persists.
        </Typography>
      )}
      {success !== null && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Redirecting you back in {countdown} seconds...
        </Typography>
      )}
      {success !== null && (
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => navigate("/expense-tracking")}
        >
          Go Back Now
        </Button>
      )}
    </Paper>
  );
};

export default StripePayment;
