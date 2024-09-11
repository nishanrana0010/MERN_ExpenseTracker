// import React from "react";

// function History({ transactions, onDelete }) {
//   return (
//     <div className="history">
//       <h1>History</h1>
//       <table id="history-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Amount</th>
//             <th>Action</th> {/* New column for delete action */}
//           </tr>
//         </thead>
//         <tbody id="history-body">
//           {transactions.map((transaction) => (
//             <tr key={transaction._id}>
//               <td>{transaction.title}</td>
//               <td
//                 style={{
//                   color:
//                     transaction.transactionType === "income" ? "green" : "red",
//                 }}
//               >
//                 {`${
//                   transaction.transactionType === "income" ? "+" : "-"
//                 }$${Math.abs(transaction.amount).toFixed(2)}`}
//               </td>
//               <td>
//                 {/* Delete icon/button */}
//                 <button
//                   onClick={() => onDelete(transaction._id)} // Pass the transaction ID
//                   style={{
//                     border: "none",
//                     cursor: "pointer",
//                     width: "5rem",
//                     backgroundColor: "transparent",
//                   }}
//                 >
//                   <img
//                     src="icons/delete.png" // Assuming you have a delete icon in your project
//                     alt="Delete"
//                     style={{ width: "20px", height: "20px" }}
//                   />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default History;

import React from "react";

function History({ transactions, onDelete }) {
  return (
    <div className="history">
      <h1>History</h1>
      <table id="history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th> {/* New Category column */}
            <th>Action</th> {/* Column for delete action */}
          </tr>
        </thead>
        <tbody id="history-body">
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td
                style={{
                  color:
                    transaction.transactionType === "income" ? "green" : "red",
                }}
              >
                {`${
                  transaction.transactionType === "income" ? "+" : "-"
                }$${Math.abs(transaction.amount).toFixed(2)}`}
              </td>
              <td>{transaction.category}</td> {/* Displaying category */}
              <td>
                <button
                  onClick={() => onDelete(transaction._id)} // Pass the transaction ID
                  style={{
                    border: "none",
                    cursor: "pointer",
                    width: "5rem",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src="icons/delete.png" // Assuming you have a delete icon in your project
                    alt="Delete"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
