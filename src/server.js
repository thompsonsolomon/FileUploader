// src/server.js

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

app.use("/upload", uploadRoutes);


// ================= HEALTH =================

app.get("/", (req, res) => {
  res.send("SmartDev Upload API Running 🚀");
});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});