import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllRecipes } from "../services/RecipeService";
import LoadingComponent from "../components/LoadingComponent";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await getAllRecipes(1);

      if (fetchedRecipes.length === 0) {
        setHasNextPage(false);
      } else if (fetchedRecipes.length === 20) {
        setHasNextPage(true);
        setRecipes(fetchedRecipes);
      } else {
        setHasNextPage(false);
        setRecipes(fetchedRecipes);
      }

      setLoading(false);
    };

    if (location.state && location.state.message) {
      setMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }

    fetchRecipes();
  }, [location.state, location.pathname, navigate]);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber >= 1) {
      if (pageNumber === currentPage) return;

      const fetchedRecipes = await getAllRecipes(pageNumber);

      if (fetchedRecipes.length > 0) {
        setRecipes(fetchedRecipes);
        const url = new URL(window.location.href);
        url.searchParams.set("page", pageNumber.toString());
        window.history.pushState({}, "", url.toString());
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
        if (fetchedRecipes.length >= 20) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
          if (currentPage === pageNumber) {
            setCurrentPage(1);
          }
        }
      }
    }
  };

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="mt-5">
      {message && (
        <div
          className={`font-artifika p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-400`}
        >
          {message}
        </div>
      )}

      <h1 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
        Bienvenue sur Share My Recipe
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h1>
      <p className="mb-8 mx-20 flex flex-col gap-3">
        <p>
          Vous cherchez des idées de repas simples et savoureuses ? Vous êtes au
          bon endroit ! Share My Recipe est une communauté chaleureuse dédiée à
          tous les passionnés de cuisine, qu'ils soient débutants ou chefs en
          herbe.
        </p>
        <p>
          Ici, vous pouvez explorer une multitude de recettes partagées par
          d'autres utilisateurs, toutes conçues pour répondre aux besoins des
          cuisiniers de tous les jours. Que vous ayez quelques ingrédients dans
          votre frigo ou que vous soyez en quête d'inspiration pour un repas
          spécial, notre moteur de recherche intuitif vous permet de filtrer les
          recettes par ingrédients, types de plats et plus encore.
        </p>
        <p>
          Vous pouvez également faire briller votre créativité en publiant vos
          propres recettes. Ajoutez des tags pour faciliter la découverte de vos
          plats et partagez votre savoir-faire avec notre communauté. Et
          n'oubliez pas de noter les recettes que vous essayez, de 1 à 5
          étoiles, pour aider les autres à choisir les meilleures !
        </p>
        <p>
          Rejoignez-nous pour partager votre passion pour la cuisine, découvrir
          de nouvelles saveurs, et surtout, pour profiter d'un moment convivial
          autour de bons plats.
        </p>

        <strong>
          Cuisiner, partager, déguster : ensemble, faisons de chaque repas un
          moment spécial !
        </strong>
      </p>

      <h2 className="font-artifika text-2xl font-bold text-center mb-8 text-gray-800 relative">
        Recettes du moment
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>
      {recipes && (
        <div className="grid grid-cols-4 gap-8 m-12">
          {recipes.map((recipe: any, index: number) => (
            <div
              className="flex flex-col h-full transition-transform transform hover:scale-105 shadow-lg border rounded-lg overflow-hidden hover:cursor-pointer"
              key={index}
              onClick={() => handleCardClick(recipe.id)}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
