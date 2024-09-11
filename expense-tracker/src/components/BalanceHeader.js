import React from "react";

const BalanceHeader = ({ balance = 0 }) => {
  return (
    <div className="balance-header">
      <h>Your Balance</h>
      <p id="balance">${balance.toFixed(2)}</p>
    </div>
  );
};

export default BalanceHeader;
