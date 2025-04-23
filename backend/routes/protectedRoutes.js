const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware(), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}, you have access to the dashboard!` });
});

module.exports = router;
