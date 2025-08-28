import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Receipe" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
