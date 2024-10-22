import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";

const formatSlug = (slug: string) => {
  return slug
    .split("-") // Divise le slug en mots
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "); // Rejoint les mots avec un espace
};

const getKeywordFromSlug = (slug: string) => {
  switch (slug) {
    case "dernieres-recettes":
      return "noveau";
    case "recettes-vegetariennes":
      return "végétarien";
    case "recettes-veganes":
      return "vegan";
    case "special-halloween":
      return "halloween";
    default:
      return "";
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const formattedSlug = formatSlug(slug || "");

  const keywordTag = getKeywordFromSlug(slug || "");

  // fetch data with keywordTag

  const recipes = [
    {
      id: 1, // Ajout de l'ID
      title: "Spaghetti Carbonara",
      image: "https://example.com/spaghetti-carbonara.jpg",
      description:
        "Un classique de la cuisine italienne, les spaghetti carbonara sont préparés avec des œufs, du fromage, de la pancetta et du poivre noir. Un plat réconfortant et savoureux qui ravira toute la famille.",
      preparation_time: 30,
      nb_persons: 4,
      difficulty: 2,
      tags: ["Pâtes", "Végé"],
      ratings: [5, 4, 1, 1], // Changement de "notes" à "ratings"
      author: { name: "Chef Luigi", experience: "10 ans" },
      date: new Date(),
    },
    {
      id: 2, // Ajout de l'ID
      title: "Tarte Tatin",
      image: "https://example.com/tarte-tatin.jpg",
      description:
        "La tarte Tatin est une tarte aux pommes caramélisées, cuite à l'envers. Un dessert français classique qui allie croustillant et douceur.",
      preparation_time: 60,
      nb_persons: 6,
      difficulty: 3,
      tags: ["Fruits", "Végé", "Produit laitier", "Sucré"],
      ratings: [5, 3], // Changement de "notes" à "ratings"
      author: { name: "Patissier Pierre", experience: "5 ans" },
      date: new Date(),
    },
    {
      id: 3, // Ajout de l'ID
      title: "Salade César",
      image: "https://example.com/salade-cesar.jpg",
      description:
        "Une salade classique à base de laitue romaine, croutons, poulet grillé et sauce César. Parfaite pour un déjeuner léger ou en entrée.",
      preparation_time: 20,
      nb_persons: 2,
      difficulty: 2,
      tags: ["Végé"],
      ratings: [4], // Changement de "notes" à "ratings"
      author: { name: "Chef Anna", experience: "8 ans" },
      date: new Date(),
    },
    {
      id: 4, // Ajout de l'ID
      title: "Chili Con Carne",
      image: "https://example.com/chili-con-carne.jpg",
      description:
        "Un plat épicé et réconfortant à base de viande hachée, haricots rouges et épices. Parfait pour les soirées d'hiver.",
      preparation_time: 75,
      nb_persons: 4,
      difficulty: 3,
      tags: ["Viande", "Épicé", "Légumineuses"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Carlos", experience: "12 ans" },
      date: new Date(),
    },
    {
      id: 5, // Ajout de l'ID
      title: "Ratatouille",
      image: "https://example.com/ratatouille.jpg",
      description:
        "Un plat provençal coloré à base de légumes mijotés. Parfait comme accompagnement ou plat principal végétarien.",
      preparation_time: 45,
      nb_persons: 4,
      difficulty: 2,
      tags: ["Végé", "Sans gluten", "Vegan"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Claire", experience: "7 ans" },
      date: new Date(),
    },
    {
      id: 6, // Ajout de l'ID
      title: "Lasagne",
      image: "https://example.com/lasagne.jpg",
      description:
        "Des couches de pâtes, de viande hachée, de sauce tomate et de fromage. Un plat réconfortant qui plaît à tous.",
      preparation_time: 90,
      nb_persons: 6,
      difficulty: 4,
      tags: ["Pâtes", "Viande", "Produit laitier", "Épicé"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Marco", experience: "15 ans" },
      date: new Date(),
    },
    {
      id: 7, // Ajout de l'ID
      title: "Mousse au Chocolat",
      image: "https://example.com/mousse-au-chocolat.jpg",
      description:
        "Un dessert léger et aérien à base de chocolat noir. Un incontournable pour les amateurs de chocolat.",
      preparation_time: 30,
      nb_persons: 4,
      difficulty: 2,
      tags: ["Sucré", "Végé", "Produit laitier"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Sophie", experience: "6 ans" },
      date: new Date(),
    },
    {
      id: 8, // Ajout de l'ID
      title: "Tacos au Poulet",
      image: "https://example.com/tacos-au-poulet.jpg",
      description:
        "Des tacos garnis de poulet épicé, de légumes frais et de salsa. Un plat simple et convivial.",
      preparation_time: 25,
      nb_persons: 4,
      difficulty: 2,
      tags: ["Viande", "Épicé", "Végé"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Miguel", experience: "4 ans" },
      date: new Date(),
    },
    {
      id: 9, // Ajout de l'ID
      title: "Soupe à l'Oignon",
      image: "https://example.com/soupe-a-l-oignon.jpg",
      description:
        "Une soupe réconfortante à base d'oignons caramélisés, servie avec du fromage et du pain grillé.",
      preparation_time: 50,
      nb_persons: 4,
      difficulty: 3,
      tags: ["Végé", "Produit laitier", "Épicé"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Jacques", experience: "20 ans" },
      date: new Date(),
    },
    {
      id: 10, // Ajout de l'ID
      title: "Quiche Lorraine",
      image: "https://example.com/quiche-lorraine.jpg",
      description:
        "Une quiche salée à base de lardons et de crème fraîche. Parfaite pour un déjeuner ou un pique-nique.",
      preparation_time: 45,
      nb_persons: 6,
      difficulty: 3,
      tags: ["Végé", "Produit laitier", "Épicé"],
      ratings: [5, 4], // Changement de "notes" à "ratings"
      author: { name: "Chef Martine", experience: "10 ans" },
      date: new Date(),
    },
  ];

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="mt-5">
      <h2 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
        {formattedSlug}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-4 gap-8 m-12">
        {recipes.map((recipe, index) => (
          <div
            className="flex flex-col h-full transition-transform transform hover:scale-105 shadow-lg border rounded-lg overflow-hidden hover:cursor-pointer"
            key={index}
            onClick={() => handleCardClick(recipe.id)}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
