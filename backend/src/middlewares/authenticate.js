import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];

  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  // Format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token format",
    });
  }

  try {
    const userdata = jwt.verify(token, process.env.SECRET_KEY);
    req.user = userdata; // ✅ now req.user contains {id, email}
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
