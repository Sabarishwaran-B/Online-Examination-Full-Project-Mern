const express = require("express");
const {
  addExam,
  editExam,
  deleteExam,
  viewResults,
  startExam,
} = require("../controllers/instructorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/exam", authMiddleware("instructor"), addExam);
router.put("/exam/:id", authMiddleware("instructor"), editExam);
router.delete("/exam/:id", authMiddleware("instructor"), deleteExam);
router.get("/results", authMiddleware("instructor"), viewResults);
router.post("/exam/start", authMiddleware("instructor"), startExam);

module.exports = router;
