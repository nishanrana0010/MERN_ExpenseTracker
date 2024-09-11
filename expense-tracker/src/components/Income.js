import React from "react";

const Income = ({ income }) => {
  return (
    <div className="income">
      <h>Income</h>
      <p id="income-amount" className="green">
        ${income.toFixed(2)}
      </p>
    </div>
  );
};

export default Income;
