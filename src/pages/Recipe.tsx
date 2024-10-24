import React, { useEffect, useState } from "react";
import RecipeContent from "../components/RecipeContent";
import { useParams } from "react-router-dom";
import { getRecipeById, getRecipesByUserSession } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";
import { useAuth } from "../context/AuthContext";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if(id){
          const fetchedRecipes = await getRecipeById(id);
          setRecipe(fetchedRecipes);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la recette', error);
      }
    };
  
    const fetchIsUserAuthor = async () => {
      try {
        if (isAuthenticated && id) {
          const recipes = await getRecipesByUserSession();
          if (recipes.length > 0) {
            recipes.forEach((userRecipe: any) => {
              if (userRecipe.id === parseInt(id)) {
                setIsAuthor(true);
              }
            });
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'auteur', error);
      }
    };
  
    fetchRecipes();
    fetchIsUserAuthor();
  }, [id, isAuthenticated]);
  

  if (loading) {
    return <LoadingComponent />;
  }

  return <RecipeContent recipe={recipe} isAuthor={isAuthor} />;
};

export default Recipe;
