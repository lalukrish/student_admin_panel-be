const express = require("express");
const app = express();

app.use("/hi", (req, res) => {
  console.log("object");
  res.send("hi");
});

const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
