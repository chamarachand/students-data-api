const express = require("express");
const router = express.Router();

//Get
router.get("/", (req, res) => {
  res.send("Welcome to student database");
});

module.exports = router;
