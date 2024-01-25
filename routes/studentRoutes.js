const express = require("express");
const router = express.Router();
const { Student, validate } = require("../models/student");

//Get
router.get("/", (req, res) => {
  res.send("Welcome to student database");
});

router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.get("/students/:studentId", async (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const student = await Student.findOne({ studentId: studentId });

  if (!student)
    return res.status(404).send("Student with the given ID not found");
  res.send(student);
});

//POST
router.post("/students", async (req, res) => {
  const student = req.body;

  const { error } = validate(student);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newStudent = await Student.create(student);
    res.status(201).send(newStudent);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//PUT
router.put("/students/:studentId", async (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const student = req.body;

  const { error } = validate(student);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedStudent = await Student.findOneAndReplace(
      { studentId: studentId },
      student,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).send("Student with the given ID not found");
    res.send(updatedStudent);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
