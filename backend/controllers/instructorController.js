const Exam = require("../models/Exam");
const Result = require("../models/Result");

exports.addExam = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const exam = new Exam({ title, instructor: req.user.id, questions });
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.viewResults = async (req, res) => {
  try {
    const results = await Result.find({}).populate("student exam");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startExam = async (req, res) => {
  res.json({ message: "Exam started successfully" });
};
