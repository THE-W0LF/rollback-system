const express = require("express");
const cors = require("cors");

const entityRoutes = require("./routes/entityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", entityRoutes);

app.get("/", (req, res) => {
  res.send("Rollback System API running");
});

module.exports = app;
