import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { stripeCheckout } from "../../api/wallet";
import CustomAlert from "../CustomAlert";

const AddMoney = ({ open, setOpen }) => {
  const [amount, setAmount] = useState(100);
  const[loading,setLoading]=useState(false)
  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "" });

  const handleCheckout = async () => {
    if (amount < 100) {
      alert("Minimum amount is ₹100");
      return;
    }

    setLoading(true);
    stripeCheckout(
      amount,
      (data) => {
        window.location.href = data.url;
      },
      (error) => {
        setErrorMsg({ open: true, msg: error });
        setLoading(false);
      }
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={"error"}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "" })}
        />
      )}
      <DialogTitle color="info" fontWeight={"bold"}>
        Add Money to Wallet
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Enter Amount (₹)</Typography>
          <TextField
            type="number"
            size="small"
            fullWidth
            value={amount}
            inputProps={{ min: 100 }}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Typography variant="body2" color="textSecondary">
            You will be redirected to Stripe Checkout to complete the payment.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          color="info"
          onClick={handleCheckout}
          variant="contained"
          disabled={loading}
          size="small"
        >
          {loading ? "Redirecting..." : `Pay ₹${amount}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoney;
