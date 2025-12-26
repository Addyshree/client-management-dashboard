const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Onboarding", "On-Hold", "Contract Ended"],
      default: "Onboarding",
    },
    serviceType: {
      type: String,
      enum: ["Permanent Recruitment", "Contract Staffing", "RPO"],
      default: "Permanent Recruitment", // ← Add default
      required: false, // ← Make optional temporarily
    },
    industry: {
      type: String,
      enum: ["IT", "Finance", "Healthcare", "Other"],
      default: "IT",
      required: false,
    },
    location: {
      type: String,
      enum: ["India", "UK", "USA", "Other"],
      default: "India",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
