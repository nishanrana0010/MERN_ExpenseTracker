const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  transactionType: String,
  category: String,
});
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
