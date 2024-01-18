const mongoose = require("mongoose");

const connection = () => {
  const url = "mongodb://localhost:27017/students-db";
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB.."))
    .catch((error) => console.error("Could not connect to MongoDB", error));
};

module.exports = connection;
