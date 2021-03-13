import mongoose from "mongoose";
const AccountsSchema = new mongoose.Schema({
  compound_id: { type: String, required: true },
  user_id: mongoose.ObjectId,
  provider_type: { type: String },
  provider_id: { type: String },
  provider_account_id: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  access_token_expires: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date }
});

export default mongoose.models.accounts || mongoose.model("accounts", AccountsSchema);
