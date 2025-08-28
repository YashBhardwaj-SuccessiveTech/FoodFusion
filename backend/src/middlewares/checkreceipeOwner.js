import Receipe from "../models/Receipe.js";

export const checkRecipeOwner = async (req, res, next) => {
  const { id } = req.params; // recipe id from URL

  try {
    const recipe = await Receipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if logged-in user is the creator
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    // Attach recipe to request so controller doesn’t have to query again
    req.recipe = recipe;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error in ownership check",
    });
  }
};
