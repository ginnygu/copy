const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    post: { type: mongoose.Schema.ObjectId, ref: "post" },
    owner: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
