const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Result = require("../models/Result");

router.get("/check-submission/:studentId/:examId", async (req, res) => {
  const { studentId, examId } = req.params;

  try {
    const existingResult = await Result.findOne({ student: studentId, exam: examId });
    if (existingResult) {
      return res.json({ submitted: true });
    }
    res.json({ submitted: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error checking submission" });
  }
});

router.post("/submit-exam", async (req, res) => {
  const { studentId, examId, answers } = req.body;

  if (!studentId || !examId || !answers) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    const existingResult = await Result.findOne({ student: studentId, exam: examId });
    if (existingResult) {
      return res.status(400).json({ error: "You have already submitted this exam" });
    }

    let score = 0;
    exam.questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        score += 1;
      }
    });

    const newResult = new Result({
      student: studentId,
      exam: examId,
      score,
      total: exam.questions.length,
    });

    await newResult.save();

    if (!exam.students.includes(studentId)) {
      exam.students.push(studentId);
      await exam.save();
    }

    res.status(200).json({ message: "Submitted successfully", score });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Submission failed", details: error.message });
  }
});

module.exports = router;
