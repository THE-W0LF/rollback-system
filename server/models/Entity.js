const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Busy", "Offline"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entity", entitySchema);
