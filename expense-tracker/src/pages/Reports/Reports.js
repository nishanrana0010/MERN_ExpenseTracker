// src/pages/Reports.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Sidebar from "../../components/Sidebar";
import "../Reports/Reports.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Reports = ({ transactions = [] }) => {
  const [selectedType, setSelectedType] = useState("income");

  // Aggregate data for the chart
  const incomeCategories = {};
  const expenseCategories = {};

  transactions.forEach((trans) => {
    const { transactionType, category, amount } = trans;

    if (transactionType === "income") {
      incomeCategories[category] = (incomeCategories[category] || 0) + amount;
    } else if (transactionType === "expense") {
      expenseCategories[category] = (expenseCategories[category] || 0) + amount;
    }
  });

  // Determine the chart data based on the selected type
  const chartData =
    selectedType === "income"
      ? {
          labels: Object.keys(incomeCategories),
          datasets: [
            {
              label: "Income by Category",
              data: Object.values(incomeCategories),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: Object.keys(expenseCategories),
          datasets: [
            {
              label: "Expense by Category",
              data: Object.values(expenseCategories),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        };

  return (
    <div className="reports">
      <Sidebar />
      <div className="chart-container">
        <h2>Income and Expense Report by Category</h2>
        <div className="chart-options">
          <label htmlFor="transactionType">Select Type: </label>
          <select
            id="transactionType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Reports;
