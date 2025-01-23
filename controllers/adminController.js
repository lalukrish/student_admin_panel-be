const Student = require("../models/studentSchema");
const Task = require("../models/taskSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Predefined admin credentials
      if (email === "admin@admin.com" && password === "admin") {
        const token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
          expiresIn: "2h", // Token expiration time
        });
        return res
          .status(200)
          .json({ message: "Admin logged in successfully", token });
      }

      res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  addStudent: async (req, res) => {
    try {
      const { name, email, department, password } = req.body;

      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = new Student({
        name,
        email,
        department,
        password: hashedPassword,
      });

      await student.save();
      res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  assignTask: async (req, res) => {
    try {
      const { studentId, task, dueTime } = req.body;

      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const newTask = new Task({ studentId, task, dueTime, status: "pending" });
      await newTask.save();

      res
        .status(201)
        .json({ message: "Task assigned successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

module.exports = adminController;
