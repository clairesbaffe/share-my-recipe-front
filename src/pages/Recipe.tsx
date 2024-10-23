import React from "react";
import RecipeContent from "../components/RecipeContent";

const Recipe = () => {
  const recipe = {
    title: "Soupe à l'oignon",
    image: "https://example.com/image.jpg",
    description: "Délicieuse soupe française.",
    recette: {
      ingredients: ["Oignons", "Bouillon", "Pain grillé"],
      instructions: [
        "Faire revenir les oignons.",
        "Ajouter le bouillon et mijoter.",
      ],
    },
    preparationTime: 1.2,
    nbPersons: 2,
    difficulty: 3.4,
    tags: ["végé", "miam"],
    ratings: 4.0,
    authorId: 1,
    date: "2024-10-22",
  };

  return <RecipeContent recipe={recipe} />;
};

export default Recipe;
