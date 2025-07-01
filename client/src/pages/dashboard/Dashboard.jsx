import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [range, setRange] = useState('This Month');
  const { user } = useAuth();

  useEffect(() => {
    // Mock data until backend is connected
    setSummary({
      totalIncome: 50000,
      totalExpenses: 32000,
      savings: [5000, 6000, 7000, 9000],
      months: ['Mar', 'Apr', 'May', 'Jun'],
      categoryLabels: ['Food', 'Rent', 'Bills', 'Transport', 'Other'],
      categoryData: [6000, 10000, 3000, 4000, 9000],
    });

    setAlerts([
      '⚠️ Food budget exceeded by ₹1000.',
      '⚠️ Transport nearing limit.',
    ]);
  }, [range]);

  if (!summary) return <div className="p-6 text-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 font-poppins">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Greeting */}
        <motion.h1
          className="text-3xl font-bold text-blue-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome back, {user?.name || 'Venom'} 👋
        </motion.h1>

        {/* Date Filter */}
        <div className="flex justify-end">
          <select
            className="px-4 py-2 border rounded-lg shadow-sm text-sm"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Summary Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card title="Income" value={summary.totalIncome} color="green" />
          <Card title="Expenses" value={summary.totalExpenses} color="red" />
          <Card title="Savings" value={summary.totalIncome - summary.totalExpenses} color="blue" />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Savings</h2>
            <Bar
              data={{
                labels: summary.months,
                datasets: [
                  {
                    label: 'Savings',
                    data: summary.savings,
                    backgroundColor: 'rgba(59,130,246,0.6)',
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Expense by Category</h2>
            <Doughnut
              data={{
                labels: summary.categoryLabels,
                datasets: [
                  {
                    data: summary.categoryData,
                    backgroundColor: [
                      '#f87171',
                      '#fb923c',
                      '#34d399',
                      '#60a5fa',
                      '#a78bfa',
                    ],
                  },
                ],
              }}
            />
          </div>
        </motion.div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div
            className="bg-red-50 border border-red-200 p-4 rounded-xl shadow space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-red-700 font-semibold text-lg">Budget Alerts</h3>
            <ul className="list-disc list-inside text-red-600 space-y-1">
              {alerts.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => {
  const colorMap = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    blue: 'text-blue-600 bg-blue-50',
  };

  return (
    <div className={`p-6 rounded-2xl shadow-xl ${colorMap[color]} transition-all`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-2xl font-bold">₹ {value.toLocaleString()}</p>
    </div>
  );
};

export default Dashboard;
