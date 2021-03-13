import mongoose from "mongoose";
const SessionsSchema = new mongoose.Schema({
  compound_id: { type: String, required: true },
  user_id: mongoose.ObjectId,
  expires: { type: Date },
  session_token: { type: String },
  access_token: { type: String },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

export default mongoose.models.sessions ||
  mongoose.model("sessions", SessionsSchema);
