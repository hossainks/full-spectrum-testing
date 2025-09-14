const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const mongodb = require('./mongodb/mongodb.connect');
const cors = require('cors');

mongodb.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200);
    res.json({ "Status": "OK" });
});

app.use("/api/books", bookRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
