import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minlength:2
    },
    LastName: {
      type: String,
      required: true,
      minlength:2
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receipe",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
