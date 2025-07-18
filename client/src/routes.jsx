import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionsPage from "./pages/transactions/TransactionsPage";
import BudgetPage from "./pages/budget/BudgetPage";
import ReportsPage from "./pages/reports/ReportsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
