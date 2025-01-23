const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddileware");
router.post("/login", adminController.adminLogin);
router.post("/add-student", authMiddleware, adminController.addStudent);
router.post("/assign-task", authMiddleware, adminController.assignTask);

module.exports = router;
