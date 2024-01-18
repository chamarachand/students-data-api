const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api", studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}..`));
