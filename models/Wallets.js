import mongoose from "mongoose";
const WalletsSchema = new mongoose.Schema({
  type: { type: Number, required: true, default: 0 },
  name: { type: String },
  owner_id: mongoose.ObjectId,
  currency_id: mongoose.ObjectId,
  created_at: { type: Date },
  updated_at: { type: Date }
});

export default mongoose.models.wallets ||
  mongoose.model("wallets", WalletsSchema);
