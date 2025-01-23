const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv"); // Correct import for dotenv

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");
dotenv.config();

app.use("/hi", (req, res) => {
  console.log("object");
  res.send("hi");
});

app.use(cors());
app.use(bodyParser.json());

//mongodb
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/admin", adminRoute);
app.use("/student", studentRoute);

const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
