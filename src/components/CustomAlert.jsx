import React from "react";
import { Alert, Snackbar } from "@mui/material";

const CustomAlert = ({ open, onClose, type, message }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert 
        onClose={onClose} 
        severity={type} // "success" | "error" | "warning" | "info"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
