import { Timer, Utensils } from "lucide-react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const RecipeContent = ({ recipe }: { recipe: any }) => {
  const recetteData = JSON.parse(recipe.recette);

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
  const bottomValue = tagCount <= 10 ? 180 : 250 + tagCount * multiplier;
  const marginTopValue = bottomValue + 16;

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
              {recipe.preparationTime && (
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-5 mr-1" />
                  {preparationTime}
                </span>
              )}
              {recipe.nbPersons && (
                <span className="inline-flex items-center gap-1">
                  <Utensils className="h-5 mr-1" />
                  {recipe.nbPersons} personnes
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-5">
              <span className="col-span-1 inline-flex items-center gap-1">
                <UserIcon className="h-5 mr-1" />
                <Link to="/profile">{recipe.author.name}</Link>
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
          {recipe.description && (
            <p className="text-sm italic w-3/5 bg-primary-light border-l-4 border-primary-dark shadow-lg p-6 rounded-lg mx-auto my-4">
              "{recipe.description}"
            </p>
          )}
        </div>
      </header>

      <div
        className="m-16 p-4 grid grid-cols-4 gap-4"
        style={{ marginTop: `${marginTopValue}px` }}
      >
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-center font-artifika relative mb-6">
            Ingrédients
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
          </h2>
          {recetteData.ingredients.map((ingredient: any, index: number) => (
            <div className="flex flex-col" key={index}>
              <p className="font-secondary">{ingredient}</p>
            </div>
          ))}
        </div>

        <div className="col-span-3">
          <h2 className="text-2xl font-bold text-center font-artifika relative mb-6">
            Instructions
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
          </h2>
          {recetteData.instructions.map((instruction: any, index: number) => (
            <div className="flex flex-col" key={index}>
              <p className="font-secondary">{instruction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeContent;
