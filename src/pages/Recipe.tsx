import React from "react";
import RecipeContent from "../components/RecipeContent";

const Recipe = () => {
  const recipe = {
    id: 1,
    title: "Soupe à l'oignon",
    image:
      "https://assets.afcdn.com/recipe/20181012/82641_w1024h1024c1cx2136cy1424cxt0cyt0cxb4272cyb2848.jpg",
    description:
      "La soupe à l'oignon est un classique de la cuisine française.",
    recette:
      '{"ingredients": ["Oignons", "Bouillon", "Pain grillé"], "instructions": ["Faire revenir les oignons.", "Ajouter le bouillon et mijoter."]}',
    preparationTime: 1.2,
    nbPersons: 2,
    difficulty: 3.4,
    tags: ["végé", "miam"],
    ratings: 4.0,
    author: { name: "Chef Luigi", experience: "10 ans" },
    date: "2024-10-22",
  };

  return <RecipeContent recipe={recipe} />;
};

export default Recipe;
