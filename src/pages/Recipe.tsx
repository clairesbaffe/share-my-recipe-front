import React, { useEffect, useState } from "react";
import RecipeContent from "../components/RecipeContent";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      if(id){
        const fetchedRecipes = await getRecipeById(id);
        setRecipe(fetchedRecipes);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [id]);

  if (loading) {
    return <LoadingComponent />;
  }

  return <RecipeContent recipe={recipe} />;
};

export default Recipe;
