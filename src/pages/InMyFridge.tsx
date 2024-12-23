import React, { useState } from "react";
import FridgeIngredients from "../components/FridgeIngredients";
import { getRecipeByIngredients } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import LoadingComponent from "../components/LoadingComponent";

const InMyFridge = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any[] | null>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber >= 1) {
      if (pageNumber === currentPage) return;

      const chipsString = chips.join(",");

      const fetchedRecipes = await getRecipeByIngredients(
        chipsString,
        pageNumber
      );

      if (fetchedRecipes.length > 0) {
        setRecipes(fetchedRecipes);
        const url = new URL(window.location.href);
        url.searchParams.set("page", pageNumber.toString());
        window.history.pushState({}, "", url.toString());
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
        if (fetchedRecipes.length === 20) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
          if (currentPage === pageNumber) {
            setCurrentPage(1);
          }
        }
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const fetchRecipes = async () => {
      console.log(chips.length);

      if (chips.length === 0) {
        setErrorMessage("Appuyez sur Entrée pour ajouter un ingrédient");
        return;
      }
      setLoading(true);
      const chipsString = chips.join(",");

      const fetchedRecipes = await getRecipeByIngredients(chipsString, 1);
      setErrorMessage("");
      setSearchMessage("");

      if (fetchedRecipes.length === 0) {
        setHasNextPage(false);
        setRecipes([]);
        setSearchMessage("Aucune recette trouvée pour ces ingrédients");
      } else if (fetchedRecipes.length === 20) {
        setHasNextPage(true);
        setRecipes(fetchedRecipes);
      } else {
        setHasNextPage(false);
        setRecipes(fetchedRecipes);
      }

      setLoading(false);
    };

    fetchRecipes();
  };

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="my-5 flex flex-col items-center">
      <FridgeIngredients
        chips={chips}
        setChips={setChips}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      {loading && <LoadingComponent />}
      {searchMessage && (
        <p className="text-gray-800 text-center font-medium mt-4 bg-gray-100 border border-gray-300 p-4 rounded">
          {searchMessage}
        </p>
      )}

      {recipes && recipes.length > 0 && (
        <div>
          <div>
            <div className="flex w-full items-center mt-8">
              <hr className="border-primary m-4 w-full" />
              <p className="text-primary font-artifika min-w-max">
                Nous vous proposons
              </p>
              <hr className="border-primary m-4 w-full" />
            </div>
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

            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InMyFridge;
