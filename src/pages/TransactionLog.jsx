import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import PageHeading from "../components/PageHeading";
import MonthSelector from "../components/MonthSelector";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { dummyTransactionLogs } from "./dummyData";
import { transactionLog } from "../api/expensetracking";
import { format, startOfMonth } from "date-fns";
import CustomAlert from "../components/CustomAlert";
import Loader from "../components/Loader";

const TransactionLog = () => {
  const [transactionData, setTransactionData] = useState([]);
   const [selectedMonth,setSelectedMonth]=useState(startOfMonth(new Date()))
    const [loaderCount, setLoaderCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState({ open: false, msg: "" });

  const getTransactionLogs = () => {
      setLoaderCount((ps) => ps + 1);
    transactionLog(
      selectedMonth.getMonth()+1,
       selectedMonth.getFullYear(),
      (data) =>{ setLoaderCount((ps) => ps - 1); setTransactionData(data)},
      (error) =>{
      setLoaderCount((ps) => ps - 1);
      setErrorMsg({open:true,msg:error})
      }
    );
  };
  useEffect(() => {
    getTransactionLogs();
  }, [selectedMonth]);

  return (
    <PageContainer>
      <PageHeading header={"Transaction Logs"} />
      {loaderCount !== 0 && <Loader open={true} />}
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={"error"}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "" })}
        />
      )}
      <MonthSelector  onMonthChange={(val)=>setSelectedMonth(val)} />
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData.map((item) => (
              <TableRow>
                <TableCell>
                  {format(new Date(item.transactionDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{item.transactionType}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell
                  style={{
                    color:
                      item.transactionType === "SPEND"
                        ? "red"
                        : "green",
                  }}
                >
                  {item.transactionType === "SPEND" ? "-" : "+"} ₹{item.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default TransactionLog;
