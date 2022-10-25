const mongoose = require("mongoose");

const HiringPostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    bannerUrl: String,
    appliedCandidate: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee-profiles'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'company-profiles'}
  },
  { timestamps: true }
);

const HiringPost = mongoose.model("hiring-posts", HiringPostSchema);

module.exports = HiringPost;
