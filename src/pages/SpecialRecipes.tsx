import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";
import { getLastestRecipes } from "../services/RecipeService";

const formatSlug = (slug: string) => {
  return slug
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};

const getKeywordFromSlug = (slug: string) => {
  switch (slug) {
    case "dernieres-recettes":
      return "nouveau";
    case "recettes-vegetariennes":
      return "végétarien";
    case "recettes-veganes":
      return "vegan";
    case "special-halloween":
      return "halloween";
    default:
      return "";
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const formattedSlug = formatSlug(slug || "");
  const keywordTag = getKeywordFromSlug(slug || "");

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getLastestRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="mt-5">
        <h2 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
          {formattedSlug}
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-4 gap-8 m-12">
          {recipes.map((recipe, index) => (
              <div
                  className="flex flex-col h-full transition-transform transform hover:scale-105 shadow-lg border rounded-lg overflow-hidden hover:cursor-pointer"
                  key={index}
                  onClick={() => handleCardClick(recipe.id)}
              >
                <RecipeCard recipe={recipe} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default Home;