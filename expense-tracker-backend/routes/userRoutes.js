const express = require("express");
const userController = require("../contollers/userController");
const authenticate = require("../middleware/authenticate"); // Authentication middleware (if needed)

const router = express.Router();

router.post("/users", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/users", authenticate, userController.getUserProfile);
router.post("/logout", authenticate, userController.logoutUser);

module.exports = router;
