// import React, { useState } from "react";
// import "./Categories.css";
// import Sidebar from "../../components/Sidebar";

// function Categories() {
//   const [categories, setCategories] = useState({
//     expense: ["Travel", "Food", "Clothing"],
//     income: ["Salary", "Investment", "Other"],
//   });

//   const [newCategory, setNewCategory] = useState("");
//   const [categoryType, setCategoryType] = useState("expense");

//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (newCategory.trim() === "") return;

//     setCategories((prevCategories) => ({
//       ...prevCategories,
//       [categoryType]: [...prevCategories[categoryType], newCategory.trim()],
//     }));
//     setNewCategory("");
//   };

//   const handleDeleteCategory = (type, category) => {
//     setCategories((prevCategories) => ({
//       ...prevCategories,
//       [type]: prevCategories[type].filter((cat) => cat !== category),
//     }));
//   };

//   return (
//     <div className="Categories-main">
//       <Sidebar />
//       <div className="categories-container">
//         <div className="categories">
//           <h1>Manage Categories</h1>
//           <form onSubmit={handleAddCategory}>
//             <div>
//               <label>
//                 Category Type:
//                 <select
//                   value={categoryType}
//                   onChange={(e) => setCategoryType(e.target.value)}
//                 >
//                   <option value="expense">Expense</option>
//                   <option value="income">Income</option>
//                 </select>
//               </label>
//             </div>
//             <div>
//               <label>
//                 New Category:
//                 <input
//                   type="text"
//                   value={newCategory}
//                   onChange={(e) => setNewCategory(e.target.value)}
//                   required
//                 />
//               </label>
//             </div>
//             <button type="submit">Add Category</button>
//           </form>
//           <div className="category-lists">
//             <div>
//               <h2>Expense Categories</h2>
//               <ul>
//                 {categories.expense.map((cat) => (
//                   <li key={cat}>
//                     {cat}
//                     <button
//                       className="Delete-btn"
//                       onClick={() => handleDeleteCategory("expense", cat)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h2>Income Categories</h2>
//               <ul>
//                 {categories.income.map((cat) => (
//                   <li key={cat}>
//                     {cat}
//                     <button
//                       className="Delete-btn"
//                       onClick={() => handleDeleteCategory("income", cat)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Categories;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import Sidebar from "../../components/Sidebar";

function Categories() {
  const [categories, setCategories] = useState({
    expense: [],
    income: [],
  });
  const [newCategory, setNewCategory] = useState("");
  const [categoryType, setCategoryType] = useState("expense");

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        const categoriesFromDB = response.data;

        // Organize categories into expense and income with IDs
        const organizedCategories = categoriesFromDB.reduce(
          (acc, category) => {
            if (category.type === "expense") {
              acc.expense.push({ id: category._id, name: category.name });
            } else if (category.type === "income") {
              acc.income.push({ id: category._id, name: category.name });
            }
            return acc;
          },
          { expense: [], income: [] }
        );

        setCategories(organizedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/categories", {
        type: categoryType,
        name: newCategory.trim(),
      });
      const newCategoryFromDB = response.data;
      setCategories((prevCategories) => ({
        ...prevCategories,
        [categoryType]: [
          ...prevCategories[categoryType],
          { id: newCategoryFromDB._id, name: newCategoryFromDB.name },
        ],
      }));
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (type, categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      setCategories((prevCategories) => ({
        ...prevCategories,
        [type]: prevCategories[type].filter((cat) => cat.id !== categoryId),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <div className="Categories-main">
      <Sidebar />
      <div className="categories-container">
        <div className="categories">
          <h1>Manage Categories</h1>
          <form onSubmit={handleAddCategory}>
            <div>
              <label>
                Category Type:
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                New Category:
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Add Category</button>
          </form>
          <div className="category-lists">
            <div>
              <h2>Expense Categories</h2>
              <ul>
                {categories.expense.map((cat) => (
                  <li key={cat.id}>
                    {cat.name} {/* Access the name property here */}
                    <button
                      className="Delete-btn"
                      onClick={() => handleDeleteCategory("expense", cat.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Income Categories</h2>
              <ul>
                {categories.income.map((cat) => (
                  <li key={cat.id}>
                    {cat.name} {/* Access the name property here */}
                    <button
                      className="Delete-btn"
                      onClick={() => handleDeleteCategory("income", cat.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
