import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import MonthSelector from "../components/MonthSelector";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  AccountBalanceWallet,
  ShoppingCart,
  Savings,
  PieChartOutlined,
  BarChartOutlined,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart as ReBarChart,
  LineChart,
  Line,
} from "recharts";
import PageHeading from "../components/PageHeading";
import { dummyDailySpend, dummyRecentTransactions } from "./dummyData";
import CustomPieChart from "../components/charts/CustomPieChart";
import CustomBarChart from "../components/charts/CustomBarChart";
import DataCard from "../components/DataCard";
import CustomLineChart from "../components/charts/CustomLineChart";
import {
  dailySpend,
  expenseList,
  expenseVsBudget,
  transactionLog,
  transactionSummary,
} from "../api/expensetracking";
import { format, startOfMonth } from "date-fns";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(new Date()));
  const [expenseData, setExpenseData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [expenseBudgetData, setExpenseBudgetData] = useState([]);
  const [dailySpendData, setDailySpendData] = useState([]);
  const [loaderCount, setLoaderCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "" });
  const [cardDetails, setCardDetails] = useState({
    walletAmt: 0,
    spendAmt: 0,
    saveAmt: 0,
  });

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
        const walletAmt =
          data.filter((item) => item.transactionType === "WALLET")[0]
            .totalAmount || 0;
        const spendAmt =
          data.filter((item) => item.transactionType === "SPEND")[0]
            .totalAmount || 0;
        setCardDetails((ps) => ({
          walletAmt: walletAmt,
          spendAmt: spendAmt,
          saveAmt: walletAmt - spendAmt,
        }));
        setLoaderCount((ps) => ps - 1);
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };
  const getTransactionLogs = () => {
    setLoaderCount((ps) => ps + 1);
    transactionLog(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),
      (data) => {
        setLoaderCount((ps) => ps - 1);
        setTransactionData(data.splice(0, 4));
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };
  const getExpenseVsBudget = () => {
    setLoaderCount((ps) => ps + 1);
    expenseVsBudget(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),
      (data) => {
        setLoaderCount((ps) => ps - 1);
        setExpenseBudgetData(data);
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };
  const getDailySpend = () => {
    setLoaderCount((ps) => ps + 1);
    dailySpend(
      selectedMonth.getMonth() + 1,
      selectedMonth.getFullYear(),
      (data) => {
        setLoaderCount((ps) => ps - 1);
        setDailySpendData(data);
      },
      (error) => {
        setLoaderCount((ps) => ps - 1);
        setErrorMsg({ open: true, msg: error });
      }
    );
  };

  const currencyFormat = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    getExpenseList();
    getTransactionSummary();
    getTransactionLogs();
    getExpenseVsBudget();
    getDailySpend();
  }, [selectedMonth]);

  return (
    <PageContainer>
      <PageHeading header={"Welcome, Smruti"} />
      {loaderCount !== 0 && <Loader open={true} />}
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={"error"}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "" })}
        />
      )}

      <MonthSelector onMonthChange={(val) => setSelectedMonth(val)} />
      <Box
        sx={{ display: "flex", gap: 2, justifyContent: "center", mt: "10px" }}
      >
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
      <Stack spacing={2} height={"99vh"} overflow={"auto"} p={1} mt={5}>
        <Box display={"flex"} gap={1}>
          <Box width={"40%"} component={Paper} p={1}>
            <Typography variant="subtitle1" color="info.main">
              Category Wise Expense
            </Typography>
            <CustomPieChart data={expenseData} />
          </Box>
          <Box width={"60%"} component={Paper} p={1}>
            <Typography variant="subtitle1" color="info.main">
              Planned Vs Actual Expense
            </Typography>
            <CustomBarChart data={expenseBudgetData} />
          </Box>
        </Box>
        <Box component={Paper} p={1}>
          <Typography variant="subtitle1" color="info.main">
            Daily Spend Trend
          </Typography>
          <CustomLineChart data={dailySpendData} />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle1" color="info.main">
            Last 5 Transactions
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {" "}
                      {format(new Date(tx.transactionDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{tx.categoryName}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell
                      style={{
                        color: tx.transactionType === "SPEND" ? "red" : "green",
                      }}
                    >
                      {tx.transactionType === "SPEND" ? "-" : "+"}
                      {currencyFormat(tx.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default Dashboard;
