import User from "../models/user.js";
import pubsub from "./pubsub.js";

const resolvers = {
    Query: {
        hello: () => "Hello from GraphQL!",
        getallusers: async()=>{
            try{
                const users = await User.find({
                    favorites: { $exists: true, $ne: [] }
                });
                return {
                    success: true,
                    message: "all users fetched successfully",
                    users
                }
            }catch(error){
                console.log(error);
                return {
                    success: false,
                    message:"some error in fetching uses",
                    users: []
                }
            }
        }
    },
    Subscription: {
        recipeAdded: {
            subscribe: () => pubsub.asyncIterableIterator("RECIPE_ADDED")
        },
        recipeUpdated: {
            subscribe: () => pubsub.asyncIterableIterator("RECIPE_UPDATED")
        }
    }
};

export default resolvers;
