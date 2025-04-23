const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const User = require("../models/User");

router.get("/exams", async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("instructor", "username")
      .select("title instructor status questions");

    const formatted = exams.map((exam) => ({
      _id: exam._id,
      name: exam.title,
      instructor: exam.instructor?.username || "Unknown",
      status: exam.status,
      questions: exam.questions || [],
    }));

    res.json({ exams: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
});


router.delete("/exams/:id", async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete exam" });
  }
});

router.get("/instructors", async (req, res) => {
  try {
    const users = await User.find({ role: "instructor" });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const users = await User.find({ role: "student" });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

const bcrypt = require("bcryptjs");

router.post("/add", async (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ error: "Name and role are required" });

  try {
    const defaultPassword = "12345678";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    const newUser = new User({
      username: name,
      email: `${name.toLowerCase().replace(/\s/g, "")}@test.com`,
      phone: "0000000000",
      gender: "other",
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username: name },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
