// src/pages/reports/ExpenseChart.jsx

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const ExpenseChart = ({ transactions }) => {
  const grouped = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
            cx="50%"
            cy="50%"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
