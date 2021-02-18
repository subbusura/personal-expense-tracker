import mongoose from "mongoose";
const VerificationRequestSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  expires: { type: Date },
  token: { type: String },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

export default mongoose.model(
  "verification_requests",
  VerificationRequestSchema
);
