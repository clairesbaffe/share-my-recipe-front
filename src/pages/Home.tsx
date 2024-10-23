import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import { getAllRecipes } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";

const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await getAllRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="mt-5">
      <h2 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
        Recettes du moment
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>
      {recipes && (
        <div className="grid grid-cols-4 gap-8 m-12">
          {recipes.map((recipe: any, index: number) => (
            <div
              className="flex flex-col h-full transition-transform transform hover:scale-105 shadow-lg border rounded-lg overflow-hidden hover:cursor-pointer"
              key={index}
              onClick={() => handleCardClick(recipe.id)}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
