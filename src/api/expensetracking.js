import axiosInstance from "../utils/axiosInstance";

export const categoryList = async ( fSuccess, fError) => {
  try {
    let res = await axiosInstance.get("/category-budget/categories");
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const addBudget = async (body, fSuccess, fError) => {
  try {
    let res = await axiosInstance.post("/category-budget",body);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const budgetList = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/category-budget/budgets?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};

export const addExpense = async (body, fSuccess, fError) => {
  try {
    let res = await axiosInstance.post("/expense/add",body);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};

export const expenseList = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/expense/list?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const transactionLog = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/expense/transactions?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const transactionSummary = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/expense/transaction-summary?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const expenseVsBudget = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/expense/expense-budget-summary?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};
export const dailySpend = async (month,year, fSuccess, fError) => {
  try {
    let res = await axiosInstance.get(`/expense/daily-spend?month=${month}&year=${year}`);
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};



