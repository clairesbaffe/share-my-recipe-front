import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";
import { getLastestRecipes } from "../services/RecipeService";
import Pagination from "../components/Pagination";
import LoadingComponent from "../components/LoadingComponent";

const formatSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getKeywordFromSlug = (slug: string) => {
  switch (slug) {
    case "dernières-recettes":
      return "nouveau";
    case "recettes-végétariennes":
      return "végétarien";
    case "recettes-véganes":
      return "vegan";
    case "spécial-halloween":
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  useEffect(() => {

    const fetchLastRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await getLastestRecipes(1);

      if (fetchedRecipes.length === 0) {
        setHasNextPage(false);
      } else if (fetchedRecipes.length === 20) {
        setHasNextPage(true);
        setRecipes(fetchedRecipes);
      } else {
        setHasNextPage(false);
        setRecipes(fetchedRecipes);
      }

      setLoading(false);
    };

    if(keywordTag === 'nouveau'){
      fetchLastRecipes();
    }
  }, [keywordTag]);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber >= 1) {
      if (pageNumber === currentPage) return;

      const fetchedRecipes = await getLastestRecipes(pageNumber);

      if (fetchedRecipes.length > 0) {
        setRecipes(fetchedRecipes);
        const url = new URL(window.location.href);
        url.searchParams.set("page", pageNumber.toString());
        window.history.pushState({}, "", url.toString());
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
        if (fetchedRecipes.length === 20) {
          setHasNextPage(true);
        }
      } else {
        setHasNextPage(false);
        if (currentPage === pageNumber) {
          setCurrentPage(1);
        }
      }
    }
  };

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <LoadingComponent/>;
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
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
