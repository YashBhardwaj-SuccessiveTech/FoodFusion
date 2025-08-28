import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.json({
        success: false,
        message: "User does not exist, please register first",
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, existuser.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      id: existuser._id,
      email: existuser.email,
    };

    // 3. Generate JWT token
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // token valid for 1 day
    );

    req.user = token;

    console.log(req.token);

    // 4. Send response
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: existuser._id,
        FirstName: existuser.FirstName,
        LastName: existuser.LastName,
        email: existuser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
