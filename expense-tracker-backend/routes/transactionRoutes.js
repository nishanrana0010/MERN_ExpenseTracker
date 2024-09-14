const express = require("express");
const transactionController = require("../contollers/transactionContoller");

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.post("/", transactionController.addTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
