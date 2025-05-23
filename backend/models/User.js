const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: ["admin", "instructor", "student"], required: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
