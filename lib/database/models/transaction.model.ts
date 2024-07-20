import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
