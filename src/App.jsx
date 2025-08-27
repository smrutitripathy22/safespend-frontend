import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import GoogleLogin from "./pages/GoogleLogin";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import KYCSubmission from "./pages/KYCSubmission";
import ExpenseTrack from "./pages/ExpenseTrack";
import TransactionLog from "./pages/TransactionLog";
import Settings from "./pages/Settings";
import StripePayment from "./pages/StripePayment";
import { isTokenExpired } from "./utils/tokenValidity";



function App() {
  const { token, user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    if (!token || !user || isTokenExpired(token)) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        index
        element={
          token && !isTokenExpired(token) ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <GoogleLogin />
          )
        }
      />

      <Route
        path="login"
        element={
          token && !isTokenExpired(token) ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <GoogleLogin />
          )
        }
      />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="kyc"
        element={
          <ProtectedRoute>
            <KYCSubmission />
          </ProtectedRoute>
        }
      />
      <Route
        path="expense-tracking"
        element={
          <ProtectedRoute>
            <ExpenseTrack />
          </ProtectedRoute>
        }
      />
      <Route
        path="transaction-logs"
        element={
          <ProtectedRoute>
            <TransactionLog />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="stripe-payment"
        element={
          <ProtectedRoute>
            <StripePayment />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
