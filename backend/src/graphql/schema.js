import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Recipe {
        title: String
        makingsteps: String
        category: String
        imageurl: String
        ingredients: [String]
       
    }

    type Query {
        hello: String
    }

    type Subscription {
        recipeAdded: Recipe
    }
`;

export default typeDefs;
