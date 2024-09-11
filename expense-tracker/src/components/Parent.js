// import React, { useState } from "react";
// import BalanceHeader from "../../components/BalanceHeader";
// import Expense from "../../components/Expense";
// import Income from "../../components/Income";
// import AddExpense from "../pages/AddExpense/AddExpense";
// import Categories from "../pages/Categories/Categories";
// // import AddExpense from "../AddExpense/AddExpense";

// const Parent = () => {
//   const [balance, setBalance] = useState(1000); // Initial balance
//   const [income, setIncome] = useState(2000); // Initial income
//   const [expense, setExpense] = useState(500); // Initial expense
//   const [transactions, setTransactions] = useState([]);

//   // Function to update expense and balance
//   const updateExpense = (newExpense) => {
//     setExpense(newExpense);
//     setBalance(income - newExpense); // Adjust balance based on new expense
//   };
//   const [categories, setCategories] = useState({
//     expense: [],
//     income: [],
//   });
//   useEffect(() => {
//     // Fetch categories from the backend
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/categories");
//         const categoriesFromDB = response.data;

//         // Organize categories into expense and income with IDs
//         const organizedCategories = categoriesFromDB.reduce(
//           (acc, category) => {
//             if (category.type === "expense") {
//               acc.expense.push({ id: category._id, name: category.name });
//             } else if (category.type === "income") {
//               acc.income.push({ id: category._id, name: category.name });
//             }
//             return acc;
//           },
//           { expense: [], income: [] }
//         );

//         setCategories(organizedCategories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleAddCategory = async (type, categoryName) => {
//     try {
//       const response = await axios.post("http://localhost:5000/categories", {
//         type,
//         name: categoryName.trim(),
//       });
//       const newCategoryFromDB = response.data;
//       setCategories((prevCategories) => ({
//         ...prevCategories,
//         [type]: [
//           ...prevCategories[type],
//           { id: newCategoryFromDB._id, name: newCategoryFromDB.name },
//         ],
//       }));
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   const handleDeleteCategory = async (type, categoryId) => {
//     try {
//       await axios.delete(`http://localhost:5000/categories/${categoryId}`);
//       setCategories((prevCategories) => ({
//         ...prevCategories,
//         [type]: prevCategories[type].filter((cat) => cat.id !== categoryId),
//       }));
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   return (
//     <div>
//       <BalanceHeader balance={balance} />
//       <Income income={income} />
//       <Expense expense={expense} />
//       <AddExpense
//         balance={balance}
//         expense={expense}
//         updateExpense={updateExpense} // Pass updateExpense as a prop
//         setBalance={setBalance}
//         setIncome={setIncome}
//         setTransactions={setTransactions}
//         transactions={transactions}
//         setExpense={setExpense}
//         categories={categories}
//       />
//       <Categories
//         categories={categories}
//         onAddCategory={handleAddCategory}
//         onDeleteCategory={handleDeleteCategory}
//       />
//     </div>
//   );
// };

// export default Parent;
