const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: Number,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,
  contact: {
    phone: String,
    email: String,
    address: String,
  },
  guardianInfo: {
    name: String,
    contact: {
      phone: String,
      email: String,
    },
  },
  isActive: Boolean,
  semFeesPaid: Boolean,
  hasLibraryAccess: Boolean,
  doingSports: Boolean,
  inClubs: Boolean,
});

//Get
router.get("/", (req, res) => {
  res.send("Welcome to student database");
});

router.get("/students", (req, res) => {});

module.exports = router;
