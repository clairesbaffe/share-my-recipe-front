import React, { useMemo } from "react";
import { Timer, Utensils, CookingPot } from "lucide-react";
import StarRatings from "react-star-ratings";

const RecipeCard = ({ recipe }: { recipe: any }) => {
  let preparationTime;
  const totalMinutes = recipe.preparationTime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (totalMinutes >= 60) {
    preparationTime = minutes === 0 ? `${hours} h` : `${hours} h ${minutes} mn`;
  } else {
    preparationTime = `${totalMinutes} mn`;
  }

  const averageRating = recipe.rating;

  const imageId = useMemo(() => Math.floor(Math.random() * 1000), []);

  return (
    <div className="h-[450px] max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col">
      <div className="flex justify-center items-center h-48">
        <img
          className="h-full w-full object-cover"
          src={`https://picsum.photos/id/${imageId}/750/450`}
          alt={recipe.title}
        />
      </div>
      <div className="flex flex-col gap-0">
        <div className="px-6 py-4">
          <div className="font-bold text-xl">{recipe.title}</div>
        </div>
        <div className="space-x-2">
          {recipe.nbPersons && (
            <span className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <Utensils className="h-5 mr-1" />
              {recipe.nbPersons}
            </span>
          )}
          <span className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            <Timer className="h-5 mr-1" />
            {preparationTime}
          </span>
        </div>
        <div className="flex justify-center items-center px-6 py-4">
          {Array.from({ length: recipe.difficulty }, (_, index) => (
            <CookingPot key={index} className="h-5 mr-1 text-yellow-500" />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center">
            {recipe.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {recipe.rating > 0 && (
          <div className="flex justify-center items-center px-6 py-4">
            <StarRatings
              rating={averageRating}
              starRatedColor="#EAB308"
              starEmptyColor="gray"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="3px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
