const Student = require("../models/studentSchema");
const Task = require("../models/taskSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "jse234Adswjsfj";

const studentController = {
  studentLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ email });

      if (!student) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordMatch = await bcrypt.compare(password, student.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { studentId: student._id, email: student.email },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.status(200).json({ message: "Login successful", token, student });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  getTasks: async (req, res) => {
    try {
      const { studentId } = req.params;
      const tasks = await Task.find({ studentId }).populate(
        "studentId"
        //     "name email"
      );
      const now = new Date();

      const updatedTasks = tasks.map((task) => {
        if (task.status === "pending" && new Date(task.dueTime) < now) {
          task.status = "due";
          task.save();
        }
        return task;
      });

      res.status(200).json(updatedTasks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      task.status = "completed";
      await task.save();
      res
        .status(200)
        .json({ message: "Task status updated successfully", task });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

module.exports = studentController;
