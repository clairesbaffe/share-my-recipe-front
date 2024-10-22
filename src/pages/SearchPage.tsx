import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearch from "../components/AdvancedSearch";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  // fetch with query

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
    const [tagsItemsInputValue, setShowTagsItemsInputValue] =
      useState("");

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
    console.log('Recherche effectuée avec les paramètres :', {
      excludedItems,
      difficulty,
      tagsItems
    });
  };

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
        />
      </div>

      <div className="flex-grow text-center relative">
        <h2 className="font-artifika text-2xl my-4 text-gray-800">
          Résultats pour : {query}
        </h2>
      </div>
    </div>
  );
};

export default SearchPage;
