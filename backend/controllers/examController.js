const Exam = require("../models/Exam");

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch exams" });
  }
};

module.exports = { getAllExams };
