const User = require("../models/User");
const Exam = require("../models/Exam");



exports.editExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const exam = await Exam.findByIdAndUpdate(id, updates, { new: true });
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
