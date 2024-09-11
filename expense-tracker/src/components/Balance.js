import React, { useState, useEffect } from "react";
import axios from "axios";
import History from "./History"; // Import the History component
import BalanceHeader from "./BalanceHeader";
import Income from "./Income";
import Expense from "./Expense";

const ExpenseTracker = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [category, setCategory] = useState("");

  const [balance, setBalance] = useState(1000);
  const [income, setIncome] = useState(600);
  const [expense, setExpense] = useState(500);
  const [transactions, setTransactions] = useState([]);

  const incomeCategories = ["Salary", "Freelance", "Investments"];
  const expenseCategories = ["Food", "Travel", "Clothing", "Rent"];

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      const transactionsData = response.data;
      setTransactions(transactionsData);

      console.log("transactionsData in dashboard", transactionsData);

      const newIncome = transactionsData
        .filter((trans) => trans.transactionType === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);
      const newExpense = transactionsData
        .filter((trans) => trans.transactionType === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);

      setIncome(newIncome);
      setExpense(newExpense);
      setBalance(newIncome - newExpense);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      // Refetch transactions and update state
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || isNaN(amount) || !category) {
      alert(
        "Please enter a valid title, amount (numbers only), and select a category."
      );
      return;
    }

    const newTransaction = {
      title,
      amount: parseFloat(amount),
      transactionType,
      category,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/transactions",
        newTransaction
      );
      setTransactions([...transactions, response.data]);

      // Update balance, income, and expense
      if (transactionType === "income") {
        setIncome(income + parseFloat(amount));
        setBalance(balance + parseFloat(amount));
      } else {
        setExpense(expense + Math.abs(parseFloat(amount)));
        setBalance(balance - Math.abs(parseFloat(amount)));
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }

    // Reset form
    // setTitle("");
    // setAmount("");
    // setCategory("");
    // setTransactionType("income");
  };

  return (
    <div className="balance-main">
      <div className="container-main">
        <h1>EXPEN$E Tracker</h1>
        {/* <div className="balance-header">
          <h>Your Balance</h>
          <p id="balance">${balance.toFixed(2)}</p>
        </div> */}
        <BalanceHeader balance={balance} />
        <div className="in-exp">
          {/* <div className="income">
            <h>Income</h>
            <p id="income-amount" className="green">
              ${income.toFixed(2)}
            </p>
          </div>
          <div className="expense">
            <h>Expense</h>
            <p id="expense-amount" className="red">
              ${expense.toFixed(2)}
            </p>
          </div> */}
          <Income income={income} />
          <Expense expense={expense} />
        </div>
        <form onSubmit={onSubmit}>
          <div className="add-new">
            <div className="new-title">
              <p>Title</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="new-amount">
              <p>Amount (add - for expense)</p>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={(e) => {
                  if (!/[0-9-]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="new-transaction-type">
              <p>Transaction Type</p>
              <select
                value={transactionType}
                onChange={(e) => {
                  setTransactionType(e.target.value);
                  setCategory(""); // Reset category when changing type
                }}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="new-category">
              <p>Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {(transactionType === "income"
                  ? incomeCategories
                  : expenseCategories
                ).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div id="submit">
            <button type="submit">Add Transaction</button>
          </div>
        </form>
      </div>
      <History transactions={transactions} onDelete={handleDelete} />
    </div>
  );
};

export default ExpenseTracker;
