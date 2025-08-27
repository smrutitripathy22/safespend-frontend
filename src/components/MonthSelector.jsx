import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  addMonths,
  format,
  startOfMonth,
  isSameMonth,
  isAfter,
} from "date-fns";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const MonthSelector = ({ onMonthChange }) => {
  const today = startOfMonth(new Date());

  const [monthYear, setMonthYear] = useState(today);

  const handlePrevMonth = () => {
    const newDate = addMonths(monthYear, -1);
    setMonthYear(newDate);
    onMonthChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(monthYear, 1);
    setMonthYear(newDate);
    onMonthChange?.(newDate);
  };

  const isFutureMonth = isAfter(monthYear, today);
  const isCurrentMonth = isSameMonth(monthYear, today);
  const disableNext = isFutureMonth || isCurrentMonth;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton onClick={handlePrevMonth}>
        <KeyboardDoubleArrowLeftIcon color="info" />
      </IconButton>

      <Typography variant="body2">{format(monthYear, "MMMM yyyy")}</Typography>

      <IconButton onClick={handleNextMonth} disabled={disableNext} color="info">
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default MonthSelector;
