import pubsub from "./pubsub.js";

const resolvers = {
    Query: {
        hello: () => "Hello from GraphQL!"
    },
    Subscription: {
        recipeAdded: {
            subscribe: () => pubsub.asyncIterableIterator("RECIPE_ADDED")
        }
    }
};

export default resolvers;
