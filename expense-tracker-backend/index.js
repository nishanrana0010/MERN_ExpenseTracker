// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "your_jwt_secret";

// const app = express();
// const port = 5000; // Choose any available port

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/React_Expense_Tracker", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Define the Transaction model
// const transactionSchema = new mongoose.Schema({
//   title: String,
//   amount: Number,
//   transactionType: String,
//   category: String,
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// const categorySchema = new mongoose.Schema({
//   type: String,
//   name: String,
// });

// const Category = mongoose.model("Category", categorySchema);

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", UserSchema);

// // Registration route
// app.post("/users", async (req, res) => {
//   const { name, username, email, password } = req.body;

//   // Validate request data
//   if (!name || !username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if the user already exists (by email)
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Password Hashing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user and save it to the database
//     const newUser = new User({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // Validate request
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Compare passwords
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
//       expiresIn: "1h",
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // Get all transactions
// app.get("/transactions", async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).send("Error fetching transactions");
//   }
// });

// // Add a new transaction
// app.post("/transactions", async (req, res) => {
//   try {
//     const transaction = new Transaction(req.body);
//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (error) {
//     res.status(400).send("Error adding transaction");
//   }
// });

// // Delete a transaction
// app.delete("/transactions/:id", async (req, res) => {
//   try {
//     const transaction = await Transaction.findByIdAndDelete(req.params.id);
//     if (!transaction) {
//       return res.status(404).send("Transaction not found");
//     }
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).send("Error deleting transaction");
//   }
// });
// app.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).send("Error fetching categories");
//   }
// });

// // Add a new category
// app.post("/categories", async (req, res) => {
//   try {
//     const { type, name } = req.body;
//     const category = new Category({ type, name });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).send("Error adding category");
//   }
// });

// // Delete a category
// app.delete("/categories/:id", async (req, res) => {
//   try {
//     const categoryId = req.params.id;
//     const category = await Category.findByIdAndDelete(categoryId);
//     if (!category) {
//       return res.status(404).send("Category not found");
//     }
//     res.sendStatus(204); // No content
//   } catch (error) {
//     console.error("Error deleting category:", error);
//     res.status(500).send("Error deleting category");
//   }
// });

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });
//     req.user = decoded;
//     next();
//   });
// };
// app.get("/users", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// app.post("/logout", authenticate, (req, res) => {
//   // Token invalidation logic (e.g., adding token to a blacklist) can be added here
//   res.status(200).json({ message: "Logged out" });
// });
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/config");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRoutes);
app.use("/", userRoutes);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
