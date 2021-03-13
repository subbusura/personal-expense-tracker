import mongoose from "mongoose";
const MyEventSchema = new mongoose.Schema({
  wallet_id: mongoose.ObjectId,
  type: { type: Number, default: 1 },
  category_id: mongoose.ObjectId,
  start_amount: { type: Number, default: 0 },
  goal_amount: { type: Number, default: 0 },
  created_by: mongoose.ObjectId,
  end_date: { type: Date }
});

export default mongoose.models.my_event ||
  mongoose.model("my_event", MyEventSchema);
