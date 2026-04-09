import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Recipe {
        title: String
        makingsteps: String
        category: String
        imageurl: String
        ingredients: [String]
    }
    
    type User {
        FirstName: String
        LastName: String
        email: String
        password: String
        favorites: [String]
    }

    type getuserresponse{
        success: Boolean!
        message: String!
        users: [User!]!
    }

    type Query {
        hello: String
        getallusers: getuserresponse!
    }

    type Subscription {
        recipeAdded: Recipe
        recipeUpdated: Recipe
    }
`;

export default typeDefs;
