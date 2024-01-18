const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const connection = require("./database");

// Connecting to MongoDB
connection();

// Middleware
app.use(express.json());
app.use("/api", studentRoutes);

// Connecting to the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}..`));
