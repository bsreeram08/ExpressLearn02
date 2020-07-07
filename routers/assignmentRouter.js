const express = require("express");
const router = express.Router();
const assignmentPage = require("../controllers/assignmentController");
router.post("/", assignmentPage.addAssignment);
module.exports = router;
