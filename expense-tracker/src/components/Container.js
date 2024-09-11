import React, { useState } from "react";
import Balance from "./Balance";

// import History from "./History";

function Container() {
  const [balance, setBalance] = useState(1000.0);
  const [income, setIncome] = useState(600.0);
  const [expense, setExpense] = useState(200.0);
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (title, amount) => {
    if (title === "" || isNaN(amount)) {
      alert("Please enter a valid title and amount");
      return;
    }

    if (amount < 0 && Math.abs(amount) > balance) {
      alert("Not enough balance");
      return;
    }

    const newTransaction = { title, amount };
    setTransactions([...transactions, newTransaction]);

    if (amount > 0) {
      setIncome(income + amount);
    } else {
      setExpense(expense + Math.abs(amount));
    }

    setBalance(balance + amount);
  };

  return (
    <div className="container">
      <div class="container-image">
        <img src="icons/Admin-amico.png" alt="" />
      </div>
      <Balance
        balance={balance}
        income={income}
        expense={expense}
        handleAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

export default Container;
