import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  email_verified: { type: Date },
  image: { type: String },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

export default mongoose.model("users", UsersSchema);
