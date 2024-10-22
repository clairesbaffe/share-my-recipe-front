import React from "react";
import RecipeContent from "../components/RecipeContent";

const Recipe = () => {
  const recipe = {
    id: 1, // Ajout de l'ID
    title: "Spaghetti Carbonara",
    image: "https://example.com/spaghetti-carbonara.jpg",
    description:
      "Un classique de la cuisine italienne, les spaghetti carbonara sont préparés avec des œufs, du fromage, de la pancetta et du poivre noir. Un plat réconfortant et savoureux qui ravira toute la famille.",
    preparation_time: 30,
    nb_persons: 4,
    difficulty: 2,
    tags: [
      "Pâtes", 
      "Végé", 
      "Italien", 
      // "Rapide", 
      // "Facile", 
      // //5
      // "Confort Food", 
      // "Repas de famille", 
      // "Savourueux", 
      // "Plat principal", 
      // "Cuisiner avec des œufs", 
      // //10
      // "Cuisiner avec du fromage", 
      // "Recette traditionnelle", 
      // "Cuisine méditerranéenne", 
      // "Régime omnivore", 
      // "Cuisine réconfortante",
      // //15
      // "Cuisiner avec des restes",
      // "Spaghetti", 
      // "Repas en 30 minutes",
      // "Cuisine à la maison",
      // "Recette simple",
      // //20
      // "Délicieux",
      // "Pâtes", 
      // "Végé", 
      // "Italien", 
      // "Rapide", 
      // //25
      // "Facile", 
      // "Confort Food", 
      // "Repas de famille", 
      // "Savourueux", 
      // "Plat principal", 
      // //30
      // "Cuisiner avec des œufs", 
      // "Cuisiner avec du fromage", 
      // "Recette traditionnelle", 
      // "Cuisine méditerranéenne", 
      // "Régime omnivore", 
      // //35
      // "Cuisine réconfortante",
      // "Cuisiner avec des restes",
      // "Spaghetti", 
      // "Repas en 30 minutes",
      // "Cuisine à la maison",
      // //40
      // "Recette simple",
      // "Délicieux",
    ],
    ratings: [5, 4, 1, 1], // Changement de "notes" à "ratings"
    author: { name: "Chef Luigi", experience: "10 ans" },
    date: new Date(),
    recipe: { // Nouveau champ ajouté
      ingredients: [
        "Spaghetti",
        "Pancetta",
        "Œufs",
        "Parmesan",
        "Poivre noir",
        "Sel"
      ],
      instructions: [
        "Faites cuire les spaghetti selon les instructions du paquet. Dans une poêle, faites revenir la pancetta jusqu'à ce qu'elle soit croustillante. Dans un bol, battez les œufs avec le parmesan et le poivre. Ajoutez les spaghetti cuits à la poêle avec la pancetta, puis retirez du feu. Incorporez le mélange d'œufs et de fromage aux spaghetti chauds. Servez immédiatement, garni de fromage supplémentaire si désiré."
      ]
    }
};

  

  return <RecipeContent recipe={recipe} />;
};

export default Recipe;
