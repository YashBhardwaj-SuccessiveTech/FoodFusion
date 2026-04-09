import Receipe from "../models/Receipe.js";
import user from "../models/user.js";
import pubsub from "../graphql/pubsub.js"; // <-- import pubsub

export const allreceipes = async (req, res) => {

  try{
    const page = parseInt(req.query.page)|| 1;
    const limit = 6;
    const skip = (page-1)* limit;

    const allreceipes = await Receipe.find({})
    .populate("createdBy")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit);

    const total = await Receipe.countDocuments();

    res.json({
      success: true,
      allreceipes,
      total,
      totalpages: Math.ceil(total/limit),
      currentpage: page
    });
  }catch(error){
    res.status(500).json({
      success:false,
      message: "server error"
    });
  }
};

export const addreceipe = async (req, res) => {
  const { title, makingsteps, category, imageurl, ingredients } = req.body;

  try {
    if (!title || !makingsteps || !category || !ingredients) {
      return res.json({
        success: false,
        message: "All the fields are needed to be filled",
      });
    }

    // console.log("decoded user", req.user);

    const newRecipe = new Receipe({
      title,
      makingsteps,
      category,
      imageurl,
      // imageurl: imageurl || "",
      ingredients,
      createdBy: req.user.id,
    });
    await newRecipe.save();

    
    pubsub.publish("RECIPE_ADDED", { recipeAdded: newRecipe });

    return res.json({
      success: true,
      message: "Receipe successfully added",
      recipe: newRecipe, 
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "some error in adding receipe",
    });
  }
};

export const updateReceipe = async (req, res) => {
  const { title, makingsteps, category, imageurl, ingredients } = req.body;

  try {
    const recipe = req.recipe;

    recipe.title = title || recipe.title;
    recipe.makingsteps = makingsteps || recipe.makingsteps;
    recipe.category = category || recipe.category;
    recipe.imageurl = imageurl || recipe.imageurl;
    recipe.ingredients = ingredients || recipe.ingredients;

    await recipe.save();

    pubsub.publish("RECIPE_UPDATED",{ recipeUpdated: recipe});

    return res.json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
    });
  }
};

export const getreceipe = async (req, res) => {
  try {
    const { id } = req.params;
    const receipe = await Receipe.findById(id).populate("createdBy");
    if (!receipe) {
      return res.json({
        success: false,
        message: "No Receipe exist",
      });
    }
    return res.json({
      success: true,
      message: "Receipe fetched successfully",
      receipe,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "some issue in fetching the receipe",
    });
  }
};

export const deletereceipe = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Receipe.findByIdAndDelete(id, { new: true });
    if (!data) {
      return res.json({
        success: false,
        message: "no receipe exist with this id",
      });
    }

    await user.updateMany({ favorites: id }, { $pull: { favorites: id } });

    return res.json({
      success: true,
      message: "receipe successfully deleted",
      data,
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "some error in deleting receipes",
    });
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json({
        success: true,
        recipes: [],
      });
    }

    // Split query into words and remove empty strings
    const terms = query
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean);

    // For title: create a regex that matches any word
    const titleRegex = terms.map((t) => new RegExp(t, "i")); // case-insensitive

    // For ingredients: regex for each term (matches any ingredient containing the term)
    const ingredientRegex = terms.map((t) => new RegExp(t, "i"));

    const recipes = await Receipe.find({
      $or: [
        { title: { $in: titleRegex } },       // match if any word appears in title
        { ingredients: { $in: ingredientRegex } }, // match if any ingredient matches
      ],
    })
      .populate("createdBy")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Successfully retrieved recipes",
      recipes,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const filtercategory = async (req, res) => {
  const { category } = req.query;

  try {
    const allowedCategories = ["Veg", "Non-Veg", "Vegan"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed: Veg, Non-Veg, Vegan",
      });
    }

    const recipes = await Receipe.find({ category }).populate("createdBy")
    .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    console.error("Error fetching category recipes:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching recipes by category",
    });
  }
};

export const addtofavourities = async (req, res) => {
  const { id } = req.params;
  try {
    const userid = req.user.id;
    const receipeid = req.params.id;

    const people = await user.findById(userid);
    if (!people)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    if (!people.favorites.includes(receipeid)) {
      people.favorites.push(receipeid);
      await people.save();
    }

    return res.json({
      success: true,
      message: "Added to favorities",
      favorities: people.favorites,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some error in addig to favourities",
    });
  }
};

// controllers/userController.js
export const removeFromFavourites = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const people = await user.findById(userId);
    if (!people) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // remove recipeId if exists
    people.favorites = people.favorites.filter(
      (fav) => fav.toString() !== recipeId
    );
    await people.save();

    return res.json({
      success: true,
      message: "Removed from favourites",
      favorites: people.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
