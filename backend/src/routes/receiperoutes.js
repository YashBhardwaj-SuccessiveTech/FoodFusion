import express from "express";
import { addreceipe, addtofavourities, allreceipes, deletereceipe, filtercategory, getreceipe, searchByIngredients, updateReceipe } from "../controllers/receipeControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRecipeOwner } from "../middlewares/checkreceipeOwner.js";
const receiperouter = express.Router();


receiperouter.get("/receipies", allreceipes);
receiperouter.get("/receipe/:id", authenticate,getreceipe);
receiperouter.get("/search",searchByIngredients);
receiperouter.get("/filtercategory", filtercategory);
receiperouter.post("/addreceipe", authenticate, addreceipe);
receiperouter.put("/addtofavourities/:id", authenticate,addtofavourities);
receiperouter.put("/updatereceipe/:id", authenticate, checkRecipeOwner, updateReceipe);
receiperouter.delete("/deletereceipe/:id",authenticate, checkRecipeOwner, deletereceipe);


export default receiperouter;
