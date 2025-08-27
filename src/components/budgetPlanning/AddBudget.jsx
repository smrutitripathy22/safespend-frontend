import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Button,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addBudget } from "../../api/expensetracking";

const AddBudget = ({ open, setOpen, categories }) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "", type:"" });

  const handleSave = () => {
    if (amount < 1) {
      setErrorMsg({ open: true, msg: "Minimum amount is ₹1", type: "error" });
      return;
    }
    addBudget(
      { categoryId: category, amount, month: month, year: year },
      () => {
        setLoading(false);
        setErrorMsg({
          open: true,
          msg: "Budget Added Successfully",
          type: "success",
        });

        setTimeout(() => setOpen(false), 2000);
      },
      (error) => {
        setErrorMsg({ open: true, msg: error, type: "error" });
        setLoading(false);
      }
    );
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
        {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={errorMsg.type}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "", type: "" })}
        />
      )}
      <DialogTitle color="info" fontWeight={"bold"}>
        Add Budget
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Category */}
          <div>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <TextField
              size="small"
              fullWidth
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <Typography variant="subtitle2" gutterBottom>
              Amount
            </Typography>
            <TextField
              size="small"
              type="number"
              fullWidth
              value={amount}
              inputProps={{ min: 1 }}
              onChange={(e) => setAmount(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="error"
          disabled={loading}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={handleSave}>
         {loading ? "Processing...": "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBudget;
