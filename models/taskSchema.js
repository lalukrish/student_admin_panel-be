const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  task: { type: String, required: true },
  dueTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "due", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
