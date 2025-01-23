const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/login", studentController.studentLogin);
router.get("/:studentId/tasks", studentController.getTasks);
router.put("/task/:taskId", studentController.updateTaskStatus);

module.exports = router;
