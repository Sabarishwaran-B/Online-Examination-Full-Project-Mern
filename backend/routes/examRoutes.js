const express = require("express");
const Exam = require("../models/Exam");
const Result=require("../models/Result");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find({ status: "Started" }).populate("instructor","username");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exams" });
  }
});

router.get("/instructor/:id", async (req, res) => {
  try {
    const exams = await Exam.find({ instructor: req.params.id });

    const examsWithStudentCount = await Promise.all(
      exams.map(async (exam) => {
        const studentCount = await Result.countDocuments({ exam: exam._id });
        return { ...exam.toObject(), totalStudents: studentCount };
      })
    );

    res.json(examsWithStudentCount);
  } catch (err) {
    console.error("Error fetching instructor's exams:", err);
    res.status(500).json({ error: "Failed to fetch exams for instructor" });
  }
});


router.get("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const exams = await Exam.find({ students: studentId });

    res.json(exams);
  } catch (err) {
    console.error("Error fetching student's exams:", err);
    res.status(500).json({ error: "Failed to fetch exams for student" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (err) {
    console.error("Error fetching exam by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  const { title, instructor, questions } = req.body;

  if (!title || !instructor || !questions || questions.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newExam = new Exam({
      title,
      instructor,
      questions,
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created", exam: newExam });
  } catch (err) {
    console.error("Error saving exam:", err);
    res.status(500).json({ error: "Failed to create exam", details: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Failed to update exam status" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(500).json({ error: "Failed to delete exam" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        status: req.body.status,
        questions: req.body.questions,
      },
      { new: true }
    );
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Failed to update exam" });
  }
});


module.exports = router;
