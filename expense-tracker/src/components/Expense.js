import React from "react";

const Expense = ({ expense = 0 }) => {
  return (
    <div className="expense">
      <h>Expense</h>
      <p id="expense-amount" className="red">
        ${expense.toFixed(2)}
      </p>
    </div>
  );
};

export default Expense;
