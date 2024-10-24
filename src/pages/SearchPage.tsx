import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvancedSearch from "../components/AdvancedSearch";
import { getAllRecipes } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";

const SearchPage = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await getAllRecipes(1);

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

    fetchRecipes();
  }, []);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber >= 1) {
      if (pageNumber === currentPage) return;

      const fetchedRecipes = await getAllRecipes(pageNumber);

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

  const [excludedItems, setExcludedItems] = useState<string[]>([]);
  const [showExcludedItemsInput, setShowExcludedItemsInput] = useState(false);
  const [excludedItemsInputValue, setShowExcludedItemsInputValue] =
    useState("");

  const [minPrep, setMinPrep] = useState(0);
  const [maxPrep, setMaxPrep] = useState(1440);

  const [difficulty, setDifficulty] = useState<number>(0);
  const [hoverDifficulty, setHoverDifficulty] = useState<number | null>(null);

  const [tagsItems, setTagsItems] = useState<string[]>([]);
  const [showTagsItemsInput, setShowTagsItemsInput] = useState(false);
  const [tagsItemsInputValue, setShowTagsItemsInputValue] = useState("");

  const [orderByRatings, setOrderByRatings] = useState(false);

  const handleKeyPressExcludedItems = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && excludedItemsInputValue.trim() !== "") {
      setExcludedItems([...excludedItems, excludedItemsInputValue]);
      setShowExcludedItemsInputValue("");
      setShowExcludedItemsInput(false);
    }
  };

  const handleDeleteExcludedItems = (index: number) => {
    const newItems = excludedItems.filter((_, i) => i !== index);
    setExcludedItems(newItems);
  };

  const handleKeyPressTagsItems = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && tagsItemsInputValue.trim() !== "") {
      setTagsItems([...tagsItems, tagsItemsInputValue]);
      setShowTagsItemsInputValue("");
      setShowTagsItemsInput(false);
    }
  };

  const handleDeleteTagsItems = (index: number) => {
    const newItems = tagsItems.filter((_, i) => i !== index);
    setTagsItems(newItems);
  };

  const handlePrepChange = (min: number, max: number) => {
    const minValue = Math.min(min, maxPrep - 1);
    setMinPrep(minValue);
    const maxValue = Math.max(max, minPrep + 1);
    setMaxPrep(maxValue);
  };

  const handleSearch = () => {
    console.log("Recherche effectuée avec les paramètres :", {
      excludedItems,
      difficulty,
      tagsItems,
      orderByRatings,
    });
    // fetch api with filters
  };

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex justify-between">
      <div className="flex-none">
        <AdvancedSearch
          excludedItems={excludedItems}
          showExcludedItemsInput={showExcludedItemsInput}
          excludedItemsInputValue={excludedItemsInputValue}
          setShowExcludedItemsInput={setShowExcludedItemsInput}
          handleKeyPressExcludedItems={handleKeyPressExcludedItems}
          handleDeleteExcludedItems={handleDeleteExcludedItems}
          setShowExcludedItemsInputValue={setShowExcludedItemsInputValue}
          minPrep={minPrep}
          maxPrep={maxPrep}
          handlePrepChange={handlePrepChange}
          difficulty={difficulty}
          hoverDifficulty={hoverDifficulty}
          setDifficulty={setDifficulty}
          setHoverDifficulty={setHoverDifficulty}
          handleSearch={handleSearch}
          tagsItems={tagsItems}
          showTagsItemsInput={showTagsItemsInput}
          tagsItemsInputValue={tagsItemsInputValue}
          setShowTagsItemsInput={setShowTagsItemsInput}
          handleKeyPressTagsItems={handleKeyPressTagsItems}
          handleDeleteTagsItems={handleDeleteTagsItems}
          setShowTagsItemsInputValue={setShowTagsItemsInputValue}
          orderByRatings={orderByRatings}
          setOrderByRatings={setOrderByRatings}
        />
      </div>

      <div className="flex-grow text-center relative">
        <h2 className="font-artifika text-2xl my-4 text-gray-800">
          Résultats pour : {query}
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
        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
