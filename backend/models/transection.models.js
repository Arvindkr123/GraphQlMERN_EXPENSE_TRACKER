import mongoose from "mongoose";

const transectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
    category: {
      type: String,
      enum: ["saving", "expense", "investment"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "Unknown",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const TransectionModel = mongoose.model(
  "Transection",
  transectionSchema
);
