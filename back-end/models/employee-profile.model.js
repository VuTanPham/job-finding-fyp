const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema(
  {
    name: String,
    dob: Date,
    age: Number,
    gender: { type: String, enum: ["Male", "Female"] },
    experiences: [
      { type: mongoose.Schema.Types.ObjectId, ref: "employee-experiences" },
    ],
    account: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

EmployeeProfileSchema.pre("save", async function (next) {
  try {
    const user = this;
    user.age =
      new Date().getFullYear() - new Date(user.dob).getFullYear();
    next();
  } catch (error) {
    next(error);
  }
});

const EmployeeProfile = mongoose.model("employee-profiles", EmployeeProfileSchema);

module.exports = EmployeeProfile;
