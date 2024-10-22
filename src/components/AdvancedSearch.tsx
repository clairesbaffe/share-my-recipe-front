import { X } from "lucide-react";
// import MultiRangeSlider from "./MultiRangeSlider";
import { GiCookingPot } from "react-icons/gi";

type AdvancedSearchProps = {
  excludedItems: string[];
  showExcludedItemsInput: boolean;
  excludedItemsInputValue: string;
  setShowExcludedItemsInput: (show: boolean) => void;
  handleKeyPressExcludedItems: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleDeleteExcludedItems: (index: number) => void;
  setShowExcludedItemsInputValue: (value: string) => void;
  minPrep: number;
  maxPrep: number;
  handlePrepChange: (min: number, max: number) => void;
  difficulty: number;
  hoverDifficulty: number | null;
  setDifficulty: (value: number) => void;
  setHoverDifficulty: (value: number | null) => void;
  handleSearch: () => void;
  tagsItems: string[];
  showTagsItemsInput: boolean;
  tagsItemsInputValue: string;
  setShowTagsItemsInput: (show: boolean) => void;
  handleKeyPressTagsItems: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDeleteTagsItems: (index: number) => void;
  setShowTagsItemsInputValue: (value: string) => void;
};

const Form = ({
  excludedItems,
  showExcludedItemsInput,
  excludedItemsInputValue,
  setShowExcludedItemsInput,
  handleKeyPressExcludedItems,
  handleDeleteExcludedItems,
  setShowExcludedItemsInputValue,
  minPrep,
  maxPrep,
  handlePrepChange,
  difficulty,
  hoverDifficulty,
  setDifficulty,
  setHoverDifficulty,
  handleSearch,
  tagsItems,
  showTagsItemsInput,
  tagsItemsInputValue,
  setShowTagsItemsInput,
  handleKeyPressTagsItems,
  handleDeleteTagsItems,
  setShowTagsItemsInputValue,
}: AdvancedSearchProps) => {
  return (
    <div className="bg-primary-light flex flex-col gap-5 min-h-screen">
      <h2 className="bg-primary-medium font-artifika text-center text-gray-800 px-12 py-1">
        Recherche avancée
      </h2>

      {/* Food exclusion */}
      <div className="font-artifika mx-5">
        <div className="flex justify-between">
          <p>Exclure</p>
          <button onClick={() => setShowExcludedItemsInput(true)}>
            + Ajouter
          </button>
        </div>

        {showExcludedItemsInput && (
          <input
            type="text"
            className="border p-1 mt-2"
            value={excludedItemsInputValue}
            onChange={(e) => setShowExcludedItemsInputValue(e.target.value)}
            onKeyPress={handleKeyPressExcludedItems}
            placeholder="Ajouter un élément"
          />
        )}

        <ul className="mt-4">
          {excludedItems.map((item: string, index: number) => (
            <li key={index} className="flex justify-between items-center mt-2">
              <span className="flex items-center">
                <button
                  onClick={() => handleDeleteExcludedItems(index)}
                  className="mr-1"
                >
                  <X />
                </button>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prep time : couldn't get it working */}
      {/* <MultiRangeSlider
        min={0}
        max={100}
        onChange={({ min, max }) => handlePrepChange(min, max)}
      /> */}

      {/* Difficulty */}
      <div className="font-artifika mx-5 flex flex-col items-center">
        <p>Difficulté</p>
        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setDifficulty(ratingValue)}
                  style={{ display: "none" }}
                />
                <GiCookingPot
                  size={30}
                  color={
                    ratingValue <= (hoverDifficulty || difficulty)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  onMouseEnter={() => setHoverDifficulty(ratingValue)}
                  onMouseLeave={() => setHoverDifficulty(null)}
                  style={{ cursor: "pointer", marginRight: 5 }}
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="font-artifika mx-5">
        <div className="flex justify-between">
          <p>Tags associés</p>
          <button onClick={() => setShowTagsItemsInput(true)}>+ Ajouter</button>
        </div>

        {showTagsItemsInput && (
          <input
            type="text"
            className="border p-1 mt-2"
            value={tagsItemsInputValue}
            onChange={(e) => setShowTagsItemsInputValue(e.target.value)}
            onKeyPress={handleKeyPressTagsItems}
            placeholder="Ajouter un élément"
          />
        )}

        <ul className="mt-4">
          {tagsItems.map((item: string, index: number) => (
            <li key={index} className="flex items-center mt-2">
              <span className="flex items-center bg-gray-200 rounded-full px-2 py-1 shadow">
                <button
                  onClick={() => handleDeleteTagsItems(index)}
                  className="mr-1 text-gray-600 hover:text-gray-800"
                >
                  <X />
                </button>
                <span className="text-gray-800">{item}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSearch}
        className="bg-primary w-2/3 h-8 mx-auto rounded-lg font-artifika"
      >
        Rechercher
      </button>
    </div>
  );
};

export default Form;
