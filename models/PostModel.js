const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: { type: Boolean, default: false }, // Add this field to track completion status
});

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
