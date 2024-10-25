import { Timer, Utensils } from "lucide-react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import RateRecipeCard from "./RateRecipeCard";
import { deleteRecipeByUserSession } from "../services/RecipeService";
import { useState } from "react";

const RecipeContent = ({
  recipe,
  isAuthor,
}: {
  recipe: any;
  isAuthor: boolean;
}) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const hours = Math.floor(recipe.preparationTime / 60);
  const minutes = recipe.preparationTime % 60;

  let preparationTime;
  if (recipe.preparationTime >= 60) {
    preparationTime = minutes === 0 ? `${hours} h` : `${hours} h ${minutes} mn`;
  } else {
    preparationTime = `${recipe.preparationTime} mn`;
  }

  // Ajust header card position according to tags number
  const tagCount = recipe.tags.length;
  const multiplier = Math.max(2, Math.floor(tagCount / 10) + 1);
  const bottomValue =
    tagCount <= 10 ? (tagCount === 0 ? 60 : 180) : 250 + tagCount * multiplier;
  const marginTopValue = bottomValue + 16;

  const handleRecipeDelete = async () => {
    try {
      await deleteRecipeByUserSession(recipe.id);
      navigate("/", {
        state: { message: "Recette supprimée avec succès !" },
      });
      window.scrollTo(0, 0);
    } catch (error) {
      setErrorMessage("La suppression de la recette a échoué");
    }
  };

  return (
    <div>
      <header className="relative w-full h-56 bg-[url('https://picsum.photos/800/200')] bg-cover font-artifika">
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-8 w-3/5`}
          style={{ bottom: `-${bottomValue}px` }}
        >
          <div className="flex flex-col">
            <div className="flex justify-around mb-5">
              <h1 className="text-2xl font-bold text-center">{recipe.title}</h1>
              {preparationTime && (
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-5 mr-1" />
                  {preparationTime}
                </span>
              )}
              {recipe.nbPersons > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Utensils className="h-5 mr-1" />
                  {recipe.nbPersons} personnes
                </span>
              )}
              {isAuthor && (
                <div>
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-3xl shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                    onClick={handleRecipeDelete}
                  >
                    Supprimer ma recette
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-5">
              <span className="col-span-1 inline-flex flex-col items-start gap-1">
                <span className="flex items-center">
                  <UserIcon className="h-5 mr-1" />
                  {/* // TODO : Remplacer par username */}
                  <Link to={`/profile/${recipe.authorId}`}>
                    {recipe.authorName}
                  </Link>
                </span>
              </span>

              {recipe.tags && (
                <span className="col-span-4 flex flex-wrap space-x-2 space-y-1">
                  {recipe.tags.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center text-sm mt-2">
              {errorMessage}
            </p>
          )}
          {recipe.description && (
            <p className="text-sm italic w-3/5 bg-primary-light border-l-4 border-primary-dark shadow-lg p-6 rounded-lg mx-auto my-4">
              "{recipe.description}"
            </p>
          )}
        </div>
      </header>

      <div
        className="flex flex-col justify-center items-center"
        style={{ marginTop: `${marginTopValue}px` }}
      >
        <div className="w-full grid grid-cols-4 gap-4 justify-items-center">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center font-artifika relative mb-6">
              Ingrédients
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
            </h2>
            {recipe.recette.ingredients.map(
              (ingredient: any, index: number) => (
                <div className="flex flex-col" key={index}>
                  <p className="font-secondary">{ingredient}</p>
                </div>
              )
            )}
          </div>

          <div className="col-span-3">
            <h2 className="text-2xl font-bold text-center font-artifika relative mb-6">
              Instructions
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
            </h2>
            {recipe.recette.instructions.map(
              (instruction: any, index: number) => (
                <div className="flex flex-col" key={index}>
                  <p className="font-secondary">{instruction}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="m-4">
          <RateRecipeCard recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeContent;
