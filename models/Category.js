import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  wallet_id: { type: mongoose.ObjectId },
  type: { type: Number, required: true, default: 0 },
  name: { type: String },
  icon_id: { type: String },
  parent_id: { type: mongoose.ObjectId }
});

export default mongoose.models.category ||
  mongoose.model("category", CategorySchema);
