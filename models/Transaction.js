import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  wallet_id: mongoose.ObjectId,
  category_id: mongoose.ObjectId,
  event_id: mongoose.ObjectId,
  amount: { type: Number },
  note: { type: String },
  created_by: mongoose.ObjectId,
  updated_by: mongoose.ObjectId,
  created_at: { type: Date },
  updated_at: { type: Date }
});

export default mongoose.models.transactions ||
  mongoose.model("transactions", TransactionSchema);
