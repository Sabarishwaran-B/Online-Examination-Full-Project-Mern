
const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Exam = require("../models/Exam");
const User = require("../models/User");

router.get("/instructor/:id", async (req, res) => {
  try {
  
    const exams = await Exam.find({ instructor: req.params.id }).populate("instructor", "username");

    const resultSummaries = await Promise.all(
      exams.map(async (exam) => {
       
        const studentCount = await Result.countDocuments({ exam: exam._id });

        return {
          examId: exam._id,
          test: exam.title,
          status: exam.status,
          students: studentCount
        };
      })
    );

    res.json(resultSummaries);
  } catch (error) {
    console.error("Error fetching exam summaries:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:examId", async (req, res) => {
  try {
    const results = await Result.find({ exam: req.params.examId })
      .populate("student")
      .sort({ score: -1 });

    const ranked = results
      .filter(r => r.student) 
      .map((r, index) => ({
        rank: index + 1,
        student: r.student.username,
        score: r.score,
        total: r.total,
      }));

    res.json(ranked);
  } catch (error) {
    console.error("Error fetching exam result details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required." });
  }

  try {
    const studentResults = await Result.find({ student: studentId });

    const finalResults = [];

    for (const result of studentResults) {
      const examId = result.exam;

      const allResults = await Result.find({ exam: examId }).sort({ score: -1 });

      const studentRank = allResults.findIndex(r => r.student.toString() === studentId) + 1;

      const exam = await Exam.findById(examId);

      finalResults.push({
        testName: exam.title,
        status: exam.status,
        studentCount: allResults.length,
        rank: studentRank
      });
    }

    res.json(finalResults);
  } catch (error) {
    console.error("Error fetching student result data:", error);
    res.status(500).json({ message: "Server error while fetching results." });
  }
});

module.exports = router;
