import "../AddIncome/AddIncome.css";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import "../AddExpense/AddExpense.css";
// import History from "../../components/History";
// import Sidebar from "../../components/Sidebar";
// import BalanceHeader from "../../components/BalanceHeader";
// import Expense from "../../components/Expense";
// import Income from "../../components/Income";

// const AddIncome = (props) => {
//   const {
//     // balance,
//     // expense,
//     // updateExpense,
//     // setTransactions,
//     // setExpense,
//     // setBalance,
//     // setIncome,
//   } = props;
//   // Receiving updateExpense as a prop
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [transactionType, setTransacionType] = useState("income");
//   const [category, setCategory] = useState("");
//   const [balance, setBalance] = useState(1000); // Initial balance
//   const [income, setIncome] = useState(2000); // Initial income
//   const [expense, setExpense] = useState(500); // Initial expense
//   const [transactions, setTransactions] = useState([]);
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/transactions/${id}`);
//       // Refetch transactions and update state
//       fetchTransactions();
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !amount || isNaN(amount) || !category) {
//       alert(
//         "Please enter a valid title, amount (numbers only), and select a category."
//       );
//       return;
//     }

//     const newTransaction = {
//       title,
//       amount: parseFloat(amount),
//       transactionType,
//       category,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/transactions",
//         newTransaction
//       );
//       setTransactions([...transactions, response.data]);

//       // Update balance, income, and expense
//       if (transactionType === "income") {
//         setIncome(income + parseFloat(amount));
//         setBalance(balance + parseFloat(amount));
//       } else {
//         setExpense(expense + Math.abs(parseFloat(amount)));
//         setBalance(balance - Math.abs(parseFloat(amount)));
//       }
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//     }

//     // Reset form
//     setTitle("");
//     setAmount("");
//     setCategory("");
//     // setTransactionType("income");
//   };

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/transactions");
//       const transactionsData = response.data;

//       // Update the transactions state with fetched data
//       setTransactions(transactionsData);

//       // Update income, expense, and balance
//       const newIncome = transactionsData
//         .filter((trans) => trans.transactionType === "income")
//         .reduce((acc, curr) => acc + curr.amount, 0);

//       const newExpense = transactionsData
//         .filter((trans) => trans.transactionType === "expense")
//         .reduce((acc, curr) => acc + curr.amount, 0);

//       setIncome(newIncome);
//       setExpense(newExpense);
//       setBalance(newIncome - newExpense);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     console.log("enter here");
//     fetchTransactions();
//   }, []);
//   const incomeTransactions = transactions.filter(
//     (trans) => trans.transactionType === "income"
//   );

//   return (
//     <div className="income-main">
//       <Sidebar />
//       <div className="balance-info">
//         <BalanceHeader balance={balance} />

//         <Income income={income} />
//       </div>
//       <div className="income-box">
//         <h2>Add Income</h2>
//         <form onSubmit={onSubmit}>
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Amount:</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Category:</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select Category
//               </option>
//               <option value="Salary">Salary</option>
//               <option value="Rental">Rental Income</option>
//               <option value="Side">Side Jobs</option>

//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <button id="button" type="submit">
//             Add Income
//           </button>
//         </form>
//       </div>
//       <History transactions={incomeTransactions} onDelete={handleDelete} />
//     </div>
//   );
// };

// export default AddIncome;
import React, { useEffect, useState } from "react";
import axios from "axios";

import "../AddExpense/AddExpense.css";
import History from "../../components/History";
import Sidebar from "../../components/Sidebar";
import BalanceHeader from "../../components/BalanceHeader";
import Expense from "../../components/Expense";
import Income from "../../components/Income";

const AddIncome = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [balance, setBalance] = useState(1000); // Initial balance
  const [income, setIncome] = useState(2000); // Initial income
  const [expense, setExpense] = useState(500); // Initial expense
  const [transactions, setTransactions] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      const transactionsData = response.data;

      setTransactions(transactionsData);

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
    fetchCategories();
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
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

    setTitle("");
    setAmount("");
    setCategory("");
    setTransactionType("income");
  };

  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const incomeTransactions = transactions.filter(
    (trans) => trans.transactionType === "income"
  );

  return (
    <div className="income-main">
      <Sidebar />
      <div className="income-img">
        <img src="icons/come.png"></img>
      </div>
      <div className="income-middle">
        <div className="balance-info">
          <BalanceHeader balance={balance} />
          <Income income={income} />
        </div>
        <div className="income-box">
          <h2>Add Income</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {transactionType === "income" &&
                  incomeCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                {transactionType === "expense" &&
                  expenseCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <button id="button" type="submit">
              Add Income
            </button>
          </form>
        </div>
      </div>

      <History transactions={incomeTransactions} onDelete={handleDelete} />
    </div>
  );
};

export default AddIncome;
