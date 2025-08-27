import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import { addExpense } from "../../api/expensetracking";
import CustomAlert from "../CustomAlert";

const AddExpense = ({ open, setOpen, categories }) => {
  const [formData, setFormData] = useState({
    title: "spend",
    description: "",
    amount: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "", type:"" });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.categoryId)
      tempErrors.categoryId = "Please select a category";
    if (!formData.amount || Number(formData.amount) <= 0)
      tempErrors.amount = "Enter a valid amount";
    if (!formData.description.trim())
      tempErrors.description = "Description is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    addExpense(
      formData,
      () => {
        setLoading(false);
        setErrorMsg({
          open: true,
          msg: "Expense Added Successfully",
          type: "success",
        });

        setTimeout(() => setOpen(false), 2000);
      },
      (err) => {
        setErrorMsg({ open: true, msg: error, type: "error" });
        setLoading(false);
      }
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={errorMsg.type}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "", type: "" })}
        />
      )}
      <DialogTitle sx={{ color: "info.main", fontWeight: "bold" }}>
        Add Expense
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {/* Category */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Category
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              error={!!errors.categoryId}
              helperText={errors.categoryId}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon fontSize="small" />
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
          </Box>

          {/* Amount */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Enter Amount (₹)
            </Typography>
            <TextField
              type="number"
              size="small"
              fullWidth
              value={formData.amount}
              inputProps={{ min: 1 }}
              onChange={(e) => handleChange("amount", e.target.value)}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Description */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Description
            </Typography>
            <TextField
              multiline
              rows={2}
              size="small"
              fullWidth
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary">
            Your amount will be deducted from your wallet, so enter it
            correctly.
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
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          size="small"
        >
          {loading ? "Processing..." : `Pay ₹${formData.amount || 0}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpense;
