import { useState } from "react";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const chipsString = chips.join(", ");
    // appel API avec chipsString
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (chips.length < 3) {
        setChips([...chips, inputValue.trim()]);
        setInputValue("");
      } else {
        alert("Vous ne pouvez ajouter que 3 éléments.");
      }
    }
  };

  const removeChip = (chipToRemove: any) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div className="bg-primary-light w-1/3 p-5 flex flex-col gap-5 rounded-lg">
      <h2 className="font-artifika text-3xl font-bold text-center mb-4 text-gray-800 relative">
        Dans mon frigo, il y a...
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>
      <p>
        Ajoutez jusqu'à 3 ingrédients avec lesquels vous aimeriez travailler.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-full"
              >
                <span className="mr-2">{chip}</span>
                <button
                  type="button"
                  onClick={() => removeChip(chip)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Ajoutez un élément"
            disabled={chips.length >= 3}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-medium font-artifika font-bold w-2/3 h-10 rounded-xl m-auto shadow-lg hover:shadow-xl transition-shadow"
        >
          Lancer la recherche
        </button>
      </form>
    </div>
  );
};

export default Form;
