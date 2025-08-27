import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import PageHeading from "../components/PageHeading";
import MonthSelector from "../components/MonthSelector";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DataCard from "../components/DataCard";
import {
  AccountBalanceWallet,
  AccountBalanceWalletSharp,
  Add,
  Edit,
  MonetizationOn,
  Savings,
  ShoppingBasket,
  ShoppingCart,
  Wallet,
} from "@mui/icons-material";

import AddBudget from "../components/budgetPlanning/AddBudget";
import AddMoney from "../components/budgetPlanning/AddMoney";
import AddExpense from "../components/budgetPlanning/AddExpense";
import {
  budgetList,
  categoryList,
  expenseList,
  transactionSummary,
} from "../api/expensetracking";
import { startOfMonth } from "date-fns";
import CustomAlert from "../components/CustomAlert";
import Loader from "../components/Loader";

const ExpenseTrack = () => {
  const [budgetData, setBudgetedData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [addBudgetModal, setAddBudgetModal] = useState(false);
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(new Date()));
  const [loaderCount, setLoaderCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "" });
  const [cardDetails, setCardDetails] = useState({
    walletAmt: 0,
    spendAmt: 0,
    saveAmt: 0,
  });

  const getBudgetist = () => {
    setLoaderCount((ps) => ps + 1);
    budgetList(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),

      (data) => {
        setLoaderCount((ps) => ps - 1);
        setBudgetedData(data);
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };
  const getExpenseList = () => {
    setLoaderCount((ps) => ps + 1);
    expenseList(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),

      (data) => {
        setLoaderCount((ps) => ps - 1);
        setExpenseData(data);
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };
  const getTransactionSummary = () => {
    setLoaderCount((ps) => ps + 1);
    setCardDetails({ walletAmt: 0, spendAmt: 0, saveAmt: 0 });
    transactionSummary(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),
      (data) => {
        setLoaderCount((ps) => ps - 1);
        const walletTransaction = data.find(
          (item) => item.transactionType === "WALLET"
        );
        const spendTransaction = data.find(
          (item) => item.transactionType === "SPEND"
        );

        const walletAmt = walletTransaction?.totalAmount || 0;
        const spendAmt = spendTransaction?.totalAmount || 0;

        setCardDetails({
          walletAmt,
          spendAmt,
          saveAmt: walletAmt - spendAmt,
        });
      },
      (err) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };

  useEffect(() => {
    categoryList(
      (data) => setCategoryData(data),
      (error) => console.error(error)
    );
    getBudgetist();
    getExpenseList();
    getTransactionSummary();
  }, [addBudgetModal, addExpenseModal, addMoneyModal, selectedMonth]);

  return (
    <PageContainer>
      {loaderCount !== 0 && <Loader open={true} />}
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={"error"}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "" })}
        />
      )}
      <PageHeading header={"Budget vs Expense"} />
      <MonthSelector onMonthChange={(val) => setSelectedMonth(val)} />
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <DataCard
          index={0}
          icon={<AccountBalanceWallet color="info" />}
          title={"Amount Added"}
          value={`₹${cardDetails?.walletAmt}`}
        />
        <DataCard
          index={1}
          icon={<ShoppingCart color="info" />}
          title={"Amount Spent"}
          value={`₹${cardDetails?.spendAmt}`}
        />
        <DataCard
          index={2}
          icon={<Savings color="info" />}
          title={"Amount Saved"}
          value={`₹${cardDetails?.saveAmt}`}
        />
      </Box>
      {selectedMonth.getMonth() === new Date().getMonth() && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            color="info"
            startIcon={<AccountBalanceWalletSharp />}
            endIcon={<Add />}
            size="small"
            onClick={() => setAddMoneyModal(true)}
          >
            Money to Wallet
          </Button>
          <Button
            onClick={() => setAddBudgetModal(true)}
            color="success"
            size="small"
            startIcon={<MonetizationOn />}
            endIcon={<Add />}
          >
            New Budget
          </Button>
          <Button
            color="secondary"
            size="small"
            startIcon={<ShoppingBasket />}
            endIcon={<Add />}
            onClick={() => setAddExpenseModal(true)}
          >
            {" "}
            New Expense
          </Button>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Paper sx={{ width: "50%", p: 1 }}>
          <Typography color="info" fontWeight={"bold"} mb={2}>
            Category Wise Budget
          </Typography>

          <TableContainer>
            <Table size="small" stickyHeader c>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Planned Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetData.map((item) => (
                  <TableRow>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>₹{item.budgetedValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper sx={{ width: "50%", p: 1 }}>
          <Typography color="info" fontWeight={"bold"} mb={2}>
            Category Wise Expense
          </Typography>
          <TableContainer>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Spent</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseData.map((item) => (
                  <TableRow>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>₹{item.amount}</TableCell>
                    <TableCell
                      style={{
                        color:
                          item.status === "On Budget"
                            ? "blue"
                            : item.status === "Under Budget"
                            ? "green"
                            : "red",
                      }}
                    >
                      {item.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {addBudgetModal && (
        <AddBudget
          open={addBudgetModal}
          setOpen={setAddBudgetModal}
          categories={categoryData}
        />
      )}
      {addMoneyModal && (
        <AddMoney open={addMoneyModal} setOpen={setAddMoneyModal} />
      )}
      {addExpenseModal && (
        <AddExpense
          open={addExpenseModal}
          setOpen={setAddExpenseModal}
          categories={categoryData}
        />
      )}
    </PageContainer>
  );
};

export default ExpenseTrack;
