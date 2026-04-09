"use client";

import gql from "graphql-tag";
import { useSubscription } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RECIPE_ADDED = gql`
  subscription {
    recipeAdded {
      title
      makingsteps
      category
      imageurl
      ingredients
    }
  }
`;

export default function RecipeNotifier() {
  const { data, error } = useSubscription(RECIPE_ADDED);

  useEffect(() => {
    if (error) {
      console.error("Subscription error:", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data?.recipeAdded) {
      toast.success(`🍲 New recipe added: ${data.recipeAdded.title}`);
    }
  }, [data]);

  return null;
}
