import Receipe from "../models/Receipe.js"
import user from "../models/user.js";

export const allreceipes = async(req, res)=>{
    const allreceipes = await Receipe.find({}).populate("createdBy");
    res.json({
        success: true,
        allreceipes
    });
}

export const addreceipe = async ( req, res)=>{
    const { title, makingsteps, category, imageurl, ingredients } = req.body;

    try{
        if(!title || !makingsteps || !category || !ingredients){
            return res.json({
                success:false,
                message:"All the fields are needed to be filled"
            });
        }

        console.log("decoded user", req.user);

        const newRecipe = new Receipe({
            title,
            makingsteps,
            category,
            imageurl:"" || imageurl,
            ingredients,
            createdBy: req.user.id,
        });
        await newRecipe.save();

        return res.json({
            success:true,
            message:"Receipe successfully added"
        });

    }catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"some error in adding receipe"
        });
    }
}

export const updateReceipe = async (req, res) => {
  const { title, makingsteps, category, imageurl,ingredients } = req.body;

  try {
    const recipe = req.recipe;

    // 3. Update only provided fields
    recipe.title = title || recipe.title;
    recipe.makingsteps = makingsteps || recipe.makingsteps;
    recipe.category = category || recipe.category;
    recipe.imageurl = imageurl || recipe.imageurl;
    recipe.ingredients = ingredients || recipe.ingredients;

    await recipe.save();

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


export const getreceipe = async(req, res)=>{
    try{      
      const { id } = req.params;
      const receipe = await Receipe.findById(id).populate("createdBy");
      if(!receipe){
        return res.json({
          success:false,
          message:"No Receipe exist"
        });
      }
      return res.json({
        success:true,
        message:"Receipe fetched successfully",
        receipe
      });
    }catch(error){
      console.log(error);
      return res.json({
        success:false,
        message:"some issue in fetching the receipe"
      });
    }
}


export const deletereceipe= async (req, res)=>{
  try{
    const {id} = req.params;
    const data = await Receipe.findByIdAndDelete(id, {new: true});
    if(!data){
      return res.json({
        success:false,
        message:"no receipe exist with this id"
      });
    }

    await user.updateMany(
      { favorites: id },
      { $pull: { favorites: id } }
    );

    return res.json({
      success:true,
      message:"receipe successfully deleted",
      data
    });
  }catch(error){ 
    console.log(error);
    return res.json({
      success:false,
      message:"some error in deleting receipes"
    });
  }
}

export const searchByIngredients = async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one ingredient",
    });
  }

  // Convert to array
  const ingredientList = ingredients.split(",").map(i => i.trim().toLowerCase());

  try {
    const recipes = await Receipe.aggregate([
      // 1. Match recipes with at least one of the given ingredients
      {
        $match: {
          ingredients: { $in: ingredientList }
        }
      },
      // 2. Add a field "matchCount" = number of matching ingredients
      {
        $addFields: {
          matchCount: {
            $size: {
              $setIntersection: ["$ingredients", ingredientList]
            }
          }
        }
      },
      // 3. Sort by matchCount (descending)
      {
        $sort: { matchCount: -1, createdAt: -1 }
      }
    ]);

    res.json({
      success: true,
      count: recipes.length,
      recipes,
    });

  } catch (error) {
    console.error("Error in ingredient search:", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching recipes",
    });
  }
};


export const filtercategory = async (req, res) => {
  const { category } = req.query; // category comes from URL

  try {
    // validate category (only Veg, Non-Veg, Vegan allowed)
    const allowedCategories = ["Veg", "Non-Veg", "Vegan"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed: Veg, Non-Veg, Vegan",
      });
    }

    const recipes = await Receipe.find({ category })
      .populate("createdBy") // optional
      .sort({ createdAt: -1 }); // newest first

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


export const addtofavourities = async (req, res)=>{
  const {id} = req.params;
  try{
    const userid = req.user.id;
    const receipeid = req.params.id;

    const people = await user.findById(userid);

    if(!people) return res.status(404).json({
      success:false,
      message:"User not found"
    });

    if(!people.favorites.includes(receipeid)){
      people.favorites.push(receipeid);
      await people.save();
    }

    return res.json({
      success:true,
      message:"Added to favorities",
      favorities:people.favorites
    });

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"some error in addig to favourities"
    });
  }
}
