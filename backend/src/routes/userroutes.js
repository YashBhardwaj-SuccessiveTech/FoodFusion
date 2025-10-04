import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { updateProfile, userinfo } from "../controllers/userControllers.js";

const userrouter = express.Router();

// update route
userrouter.get("/user/:id", userinfo);
userrouter.put("/updateuser", authenticate, updateProfile);

export default userrouter;