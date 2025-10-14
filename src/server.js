require("dotenv").config();
const express = require("express");
const { db } = require("./db/models");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api", require("./routes"));

module.exports = app;
