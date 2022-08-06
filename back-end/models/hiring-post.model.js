const mongoose = require("mongoose");

const HiringPostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    appliedCadidate: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee-profiles'}]
  },
  { timestamps: true }
);

const HiringPost = mongoose.model("hiring-posts", HiringPostSchema);

module.exports = HiringPost;
