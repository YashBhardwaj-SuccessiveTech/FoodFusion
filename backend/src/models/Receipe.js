import mongoose from "mongoose";

const ReceipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    makingsteps: {
      type: String, 
      required: true,
    },
    category: {
      type: String,
      enum: ["Veg", "Non-Veg", "Vegan"],
      required: true,
    },
    imageurl: {
      type: String,
    },
    ingredients: {
      type: [String],
      required:true,
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Receipe", ReceipeSchema);
