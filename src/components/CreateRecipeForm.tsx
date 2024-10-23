import { X } from "lucide-react";
import { useState } from "react";
import { GiCookingPot } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { createRecipe } from '../services/RecipeService';

const CreateRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showIngredientsInput, setShowIngredientsInput] = useState(true);
  const [ingredientsInputValue, setShowIngredientsInputValue] = useState("");

  const [instructions, setInstructions] = useState<string[]>([]);
  const [showInstructionsInput, setShowInstructionsInput] = useState(true);
  const [instructionsInputValue, setShowInstructionsInputValue] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [showTagsInput, setShowTagsInput] = useState(true);
  const [tagsInputValue, setShowTagsInputValue] = useState("");

  const [difficulty, setDifficulty] = useState(1);
  const [hoverDifficulty, setHoverDifficulty] = useState<number | null>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [nbPersons, setNbPersons] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyPressIngredients = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && ingredientsInputValue.trim() !== "") {
      setIngredients([...ingredients, ingredientsInputValue]);
      setShowIngredientsInputValue("");
      setShowIngredientsInput(false);
    }
  };

  const handleDeleteIngredients = (index: number) => {
    const newItems = ingredients.filter((_, i) => i !== index);
    setIngredients(newItems);
  };

  const handleKeyPressInstructions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && instructionsInputValue.trim() !== "") {
      setInstructions([...instructions, instructionsInputValue]);
      setShowInstructionsInputValue("");
      setShowInstructionsInput(false);
    }
  };

  const handleDeleteInstructions = (index: number) => {
    const newItems = instructions.filter((_, i) => i !== index);
    setInstructions(newItems);
  };

  const handleKeyPressTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagsInputValue.trim() !== "") {
      setTags([...tags, tagsInputValue]);
      setShowTagsInputValue("");
      setShowTagsInput(false);
    }
  };

  const handleDeleteTags = (index: number) => {
    const newItems = tags.filter((_, i) => i !== index);
    setTags(newItems);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const totalMinutes = hours * 60 + minutes;

    if (ingredients.length === 0) {
      setErrorMessage("Veuillez ajouter au moins un ingrédient.");
      return;
    }

    if (instructions.length === 0) {
      setErrorMessage("Veuillez ajouter au moins une instruction.");
      return;
    }

    if (totalMinutes === 0) {
      setErrorMessage("Veuillez ajouter un temps de préparation.");
      return;
    }

    setErrorMessage("");

    const recipe = {
      ingredients,
      instructions,
    };

    const formData = {
      title,
      description,
      recette: recipe,
      difficulty,
      preparationTime: totalMinutes,
      nbPersons,
      tags,
      image: 'https://example.com/image.jpg', // ou le champ image si tu le gères
    };

    try {
      const response = await createRecipe(formData);

      if (response.status === 201) {
        alert('Recette créée avec succès !');
        navigate("/"); // Redirection vers la page principale
        window.scrollTo(0, 0);
      } else {
        alert('Erreur lors de la création de la recette.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la recette:', error);
      alert('Une erreur s\'est produite lors de l\'envoi de la recette.');
    }
  };

  return (
      <div className="bg-primary-light w-1/2 p-5 flex flex-col gap-5 rounded-lg">
        <h2 className="font-artifika text-3xl font-bold text-center mb-4 text-gray-800 relative">
          Publier une recette
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
        </h2>

        <form
            className="flex flex-col gap-8 font-artifika"
            onSubmit={handleSubmit}
        >
          {/* Title */}
          <div className="flex flex-col items-center gap-3">
            <label htmlFor="title">Au menu</label>
            <input
                type="text"
                name="title"
                placeholder="Titre de la recette"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 p-3"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col items-center gap-3">
            <label htmlFor="description">Une petite description</label>
            <textarea
                name="description"
                id="description"
                placeholder="Décrivez brièvement votre plat"
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-3"
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <div className="grid gap-3">
              <p>Les ingrédients</p>
              <div className="grid grid-cols-5 gap-4 items-center">
                <button
                    type="button"
                    onClick={() => setShowIngredientsInput(true)}
                    className="text-primary col-span-1"
                >
                  Ajouter +
                </button>
                {showIngredientsInput && (
                    <input
                        type="text"
                        value={ingredientsInputValue}
                        onChange={(e) => setShowIngredientsInputValue(e.target.value)}
                        onKeyPress={handleKeyPressIngredients}
                        placeholder="Ajouter un ingrédient"
                        className="h-10 p-3 col-span-4"
                    />
                )}
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap">
              {ingredients.map((item: string, index: number) => (
                  <li key={index} className="flex items-center mt-2">
                <span className="flex items-center bg-primary-medium text-black rounded-full px-3 py-1 mr-2">
                  <button
                      type="button"
                      onClick={() => handleDeleteIngredients(index)}
                      className="mr-1 text-black"
                  >
                    <X />
                  </button>
                  {item}
                </span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <div className="grid gap-3">
              <p>Les instructions</p>

              <div className="grid grid-cols-5 gap-4 items-center">
                <button
                    type="button"
                    onClick={() => setShowInstructionsInput(true)}
                    className="text-primary col-span-1"
                >
                  + Ajouter
                </button>
                {showInstructionsInput && (
                    <input
                        type="text"
                        value={instructionsInputValue}
                        onChange={(e) => setShowInstructionsInputValue(e.target.value)}
                        onKeyPress={handleKeyPressInstructions}
                        placeholder="Ajoutez une instruction / étape de la recette"
                        className="h-10 p-3 col-span-4"
                    />
                )}
              </div>
            </div>

            <ul className="mt-4">
              {instructions.map((item: string, index: number) => (
                  <li key={index} className="flex mt-2">
                <span className="flex items-center mr-2 text-start">
                  <button
                      type="button"
                      onClick={() => handleDeleteInstructions(index)}
                      className="mr-2 text-black text-start"
                  >
                    <X />
                  </button>
                  {`Etape ${index + 1} : ${item}`}
                </span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col items-center">
            <p>Difficulté sur 5 ?</p>
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

          {/* Preparation time */}
          <div className="flex flex-col items-center gap-3">
            <label>En combien de temps ?</label>
            <div className="flex items-center gap-3">
              <input
                  type="number"
                  value={hours}
                  onChange={(e) =>
                      setHours(
                          Number(e.target.value) >= 0 ? Number(e.target.value) : 0
                      )
                  }
                  min={0}
                  placeholder="Heures"
                  className="w-16 h-10 p-2"
              />
              h
              <input
                  type="number"
                  value={minutes}
                  onChange={(e) =>
                      setMinutes(
                          Number(e.target.value) >= 0 && Number(e.target.value) < 60
                              ? Number(e.target.value)
                              : minutes
                      )
                  }
                  min={0}
                  max={59}
                  placeholder="Minutes"
                  className="w-16 h-10 p-2"
              />
              mn
            </div>
          </div>

          {/* Persons number */}
          <div className="flex flex-col items-center gap-3">
            <label htmlFor="nbPersons">Pour combien de personnes ?</label>
            <input
                type="number"
                name="nbPersons"
                min={1}
                onChange={(e) => setNbPersons(Number(e.target.value))}
                className="w-1/4 h-10 p-3"
            />
          </div>

          {/* Tags */}
          <div>
            <div className="grid gap-3">
              <p>Ajoutez des tags !</p>

              <div className="grid grid-cols-5 gap-4 items-center">
                <button
                    type="button"
                    onClick={() => setShowTagsInput(true)}
                    className="text-primary col-span-1"
                >
                  + Ajouter
                </button>
                {showTagsInput && (
                    <input
                        type="text"
                        value={tagsInputValue}
                        onChange={(e) => setShowTagsInputValue(e.target.value)}
                        onKeyPress={handleKeyPressTags}
                        placeholder="Ajoutez un tag"
                        className="h-10 p-3 col-span-4"
                    />
                )}
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap">
              {tags.map((item: string, index: number) => (
                  <li
                      key={index}
                      className="flex justify-between items-center mt-2"
                  >
                <span className="flex items-center bg-primary-medium text-black rounded-full px-3 py-1 mr-2">
                  <button
                      type="button"
                      onClick={() => handleDeleteTags(index)}
                      className="mr-1 text-black"
                  >
                    <X />
                  </button>
                  {item}
                </span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Error message */}
          {errorMessage && (
              <p className="text-red-500 text-center">
                {errorMessage}
              </p>
          )}

          <button
              type="submit"
              className="bg-primary font-artifika font-bold w-1/3 h-10 rounded-xl m-auto"
          >
            Publier
          </button>
        </form>
      </div>
  );
};

export default CreateRecipeForm;