import bcrypt from "bcrypt"
import User from "../models/user.js";

export const userinfo = async(req, res) =>{
  try {
    const {id} = req.params;
    const user = await User.findById(id).select("-password"); 

    if (!user) {
      return res.status(404).json({ 
        success:false,
        message: "User not found" 
      });
    }

    res.json({
      success:true,
      message: "user fetched successfully",
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userid = req.user.id; // comes from auth middleware
    const { FirstName, LastName, password } = req.body;

    // Find user
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (FirstName) user.FirstName = FirstName;
    if (LastName) user.LastName = LastName;

    // If password provided, hash it before saving
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};