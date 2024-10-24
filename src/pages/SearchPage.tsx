import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvancedSearch from "../components/AdvancedSearch";
import { searchRecipes, searchRecipesWithFilters } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";

const SearchPage = () => {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [excludedItems, setExcludedItems] = useState<string[]>([]);
    const [showExcludedItemsInput, setShowExcludedItemsInput] = useState(false);
    const [excludedItemsInputValue, setShowExcludedItemsInputValue] = useState("");

    const [minPrep, setMinPrep] = useState(0);
    const [maxPrep, setMaxPrep] = useState(1440);

    const [difficulty, setDifficulty] = useState<number>(0);
    const [hoverDifficulty, setHoverDifficulty] = useState<number | null>(null);

    const [tagsItems, setTagsItems] = useState<string[]>([]);
    const [showTagsItemsInput, setShowTagsItemsInput] = useState(false);
    const [tagsItemsInputValue, setShowTagsItemsInputValue] = useState("");

    const [orderByRatings, setOrderByRatings] = useState(false);

    const [filtersApplied, setFiltersApplied] = useState(false);

    const isFilteredSearch = () => {
        return excludedItems.length > 0 || tagsItems.length > 0 || difficulty > 0 || minPrep !== 0 || maxPrep !== 1440;
    };

    const fetchRecipes = async () => {
        setLoading(true);
        let fetchedRecipes;

        if (isFilteredSearch()) {
            try {
                fetchedRecipes = await searchRecipesWithFilters(
                    query,
                    currentPage,
                    20,
                    "desc",
                    orderByRatings ? "ratings" : "dates",
                    [],
                    [minPrep, maxPrep],
                    excludedItems,
                    difficulty,
                    tagsItems
                );
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes avec filtres :", error);
                setLoading(false);
                return;
            }
        } else {
            try {
                fetchedRecipes = await searchRecipes(query, currentPage);
            } catch (error) {
                console.error("Erreur lors de la recherche des recettes :", error);
                setLoading(false);
                return;
            }
        }

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

    const handleSearchClick = () => {
        setCurrentPage(1);
        fetchRecipes();
    };

    useEffect(() => {
        if (filtersApplied || query) {
            fetchRecipes();
        }
    }, [currentPage]);

    const handlePageChange = async (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    const handleKeyPressExcludedItems = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const handleKeyPressTagsItems = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        setMinPrep(Math.min(min, maxPrep - 1));
        setMaxPrep(Math.max(max, minPrep + 1));
    };

    const handleFiltersChange = () => {
        setFiltersApplied(true);
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
                    tagsItems={tagsItems}
                    showTagsItemsInput={showTagsItemsInput}
                    tagsItemsInputValue={tagsItemsInputValue}
                    setShowTagsItemsInput={setShowTagsItemsInput}
                    handleKeyPressTagsItems={handleKeyPressTagsItems}
                    handleDeleteTagsItems={handleDeleteTagsItems}
                    setShowTagsItemsInputValue={setShowTagsItemsInputValue}
                    orderByRatings={orderByRatings}
                    setOrderByRatings={setOrderByRatings}
                    handleSearch={handleSearchClick}
                />
                <button
                    className="btn btn-primary mt-4"
                    onClick={handleSearchClick}
                >
                    Rechercher
                </button>
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