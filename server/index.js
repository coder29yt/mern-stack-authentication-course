const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

// connection to db
mongoose.connect("mongodb://127.0.0.1:27017/mern-auth-course-yt").then(() => {
  console.log("Connected to MongoDB");
});

// listening to port
app.listen(port, () => console.log(`Server running on port ${port}`));
