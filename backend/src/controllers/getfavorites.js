import user from "../models/user.js";

export const getfavourites = async (req, res) => {
  try {
    const userid = req.user.id;
    const people = await user.findById(userid).populate({
      path: "favorites",
      populate: { path: "createdBy", select: "FirstName LastName _id" },
    });

    if (!people) {
      return res.status(404).json({
        success: false,
        message: "no user exist",
      });
    }

    res.json({
      success: true,
      message: "Favorities fetched successfully",
      favorites: people.favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
