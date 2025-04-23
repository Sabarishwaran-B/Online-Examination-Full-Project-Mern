const Result = require("../models/Result");

exports.attendExam = async (req, res) => {
  try {
    const { examId, score } = req.body;
    const result = new Result({ student: req.user.id, exam: examId, score });
    await result.save();
    res.json({ message: "Exam completed", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id }).populate("exam");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
