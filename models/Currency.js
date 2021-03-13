import mongoose from "mongoose";
const CurrencySchema = new mongoose.Schema({
  code: { type: String },
  name: { type: String },
  flag: { type: String }
});

export default mongoose.models.currency ||
  mongoose.model("currency", CurrencySchema);
