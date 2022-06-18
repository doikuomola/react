import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    token: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
