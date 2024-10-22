import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RateRecipeCard = ({recipeId}: {recipeId: number}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Si utilisateur connecté setIsBlurred(false);
  // Si utilisateur a déjà noté, ne pas afficher

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Veuillez sélectionner une note avant de soumettre.'); // Afficher une erreur
    } else {
      setError(''); // Réinitialiser l'erreur si une note est sélectionnée
      console.log('Note soumise avec succès !');
      // Ajoute ici toute autre logique, comme l'envoi d'une requête API
    }
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white px-10 py-6 font-artifika relative inline-block">
      Notez cette recette !
      <div className="mt-2 flex flex-col items-center">
        {isBlurred && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(1px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              pointerEvents: "auto",
            }}
          >
            <Link to="/login">
              <p className="font-artifika cursor-pointer">Connectez-vous</p>
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
        {/* <p>Note: {rating} étoile(s)</p> */}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <button
          className="bg-secondary text-white px-5 py-2 rounded-3xl mt-3"
          onClick={handleSubmit}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default RateRecipeCard;