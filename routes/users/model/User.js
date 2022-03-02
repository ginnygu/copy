const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
      required: [true, "cannot leave empty"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "cannot leave empty"],
    },
    password: { type: String, required: [true, "cannot leave empty"] },
    postHistory: [{ type: mongoose.Schema.ObjectId, ref: "post" }],
    commentHistory: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
