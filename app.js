const express = require("express");
const app = express();
const cors = require("cors");

app.use("/hi", (req, res) => {
  console.log("object");
  res.send("hi");
});

app.use(cors());
//mongodb
mongoose
  .connect(
    "mongodb+srv://lalkirshna00:lalkrishna00@cluster0.1m34c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
