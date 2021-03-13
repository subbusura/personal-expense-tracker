import mongoose from "mongoose";
const BudgetSchema = new mongoose.Schema({
  wallet_id: mongoose.ObjectId,
  category_id: mongoose.ObjectId,
  amount: { type: Number, default: 0 },
  created_by: mongoose.ObjectId,
  start_date: { type: Date },
  end_date: { type: Date }
});

export default mongoose.models.transactions ||
  mongoose.model("budget", BudgetSchema);
