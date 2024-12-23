import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  deleteRating,
  getRatesForUserAndRecipe,
  patchUserRating,
} from "../services/RatingService";
import { UserService } from "../services/UserService";

const RateRecipeCard = ({ recipeId }: { recipeId: number }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { isAuthenticated } = useAuth();
  const [userRated, setUserRated] = useState(false);

  useEffect(() => {
    const fetchUserRating = async () => {
      const response = await UserService.me();
      const data = await response.json();
      const userId = data.id;

      if (userId && recipeId) {
        const ratings = await getRatesForUserAndRecipe(userId, recipeId);
        if (ratings.length > 0) {
          setRating(ratings[0].rating);
          setUserRated(true);
        }
      }
    };

    if(isAuthenticated) fetchUserRating();
  }, [recipeId, isAuthenticated]);

  const handleSubmit = async () => {
    setMessage("");
    setError("");
    if (rating === 0) {
      setError("Veuillez sélectionner une note avant de soumettre.");
    } else {
      try {
        const recipeData = {
          rating,
        };
        await patchUserRating(recipeId, recipeData);
        setMessage("Note enregistrée avec succès!");
        setUserRated(true);
      } catch (err) {
        setError("La publication de la note a échoué");
      }
    }
  };

  const handleDeleteRating = async () => {
    if (userRated) {
      setMessage("");
      setError("");
      try {
        const response = await deleteRating(recipeId);

        if (response.status === 201) {
          setMessage("Note supprimée avec succès !");
          setRating(0);
          setUserRated(false);
        } else {
          setError("Erreur lors de la suppression de la note.");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la note:", error);
        setError(
          "Une erreur s'est produite lors de la suppression de la note."
        );
      }
    }
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white px-10 py-6 font-artifika relative inline-block">
      Notez cette recette !
      <div className="mt-2 flex flex-col items-center">
        {!isAuthenticated && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(1.5px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              pointerEvents: "auto",
            }}
          >
            <Link
              to="/login"
              className="w-full h-full flex justify-center items-center"
            >
              <p className="font-artifika m-4 cursor-pointer">
                Connectez-vous pour noter cette recette
              </p>
            </Link>
          </div>
        )}

        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={30}
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer", marginRight: 5 }}
                />
              </label>
            );
          })}
        </div>
        {message && <p className="text-xs mt-3">{message}</p>}
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
        {userRated && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-3xl mt-5 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleDeleteRating}
          >
            Supprimer ma note
          </button>
        )}

        <button
          className="bg-secondary text-white px-5 py-2 rounded-3xl mt-5"
          onClick={handleSubmit}
        >
          {userRated && <p>Mettre à jour la note</p>}
          {!userRated && <p>Envoyer</p>}
        </button>
      </div>
    </div>
  );
};

export default RateRecipeCard;
