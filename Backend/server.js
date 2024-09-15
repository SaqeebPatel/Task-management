const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./routes/userroute");
const taskrouter = require("./routes/taskrouter");
const categoryrouter = require("./routes/categoryrouter");
const priorityrouter = require("./routes/priorityrouter");
const inviterouter = require("./routes/inviterouter");
require("dotenv").config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// Routes
app.use("/api/user", userrouter);
app.use("/api/task", taskrouter);
app.use("/api/category", categoryrouter);
app.use("/api/priority", priorityrouter);
app.use("/api/invite", inviterouter);

app.use("/uploads", express.static("uploads"));

// Listen to port from environment
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
