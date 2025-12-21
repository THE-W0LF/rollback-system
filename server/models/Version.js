const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
  {
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
      required: true,
    },
    snapshot: {
      type: Object,
      required: true,
    },
    versionNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Version", versionSchema);
