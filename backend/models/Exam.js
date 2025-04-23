const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Not Yet Started" },
  totalStudents: { type: Number, default: 0 },
  questions: [{ 
    question: String, 
    options: [String], 
    correctAnswer: String 
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Exam", ExamSchema);
