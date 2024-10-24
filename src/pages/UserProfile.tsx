import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isConnectedUser, setIsConnectedUser] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await UserService.me();
        const data = await response.json();
        setUserData(data);
        setIsConnectedUser(true);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur :",
          err
        );
        setError("Impossible de récupérer les informations du profil.");
      }
    };

    const fetchUserProfileById = async (id: string) => {
      try {
        const response = await UserService.getUserById(id);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          err
        );
        setError("Impossible de récupérer les informations de l'utilisateur.");
      }
    };

    if (id) {
      fetchUserProfileById(id);
    } else {
      fetchUserProfile();
    }
  }, [id]);

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    try {
      const response = await UserService.changePassword(newPassword);
      if (response.status === 200) {
        alert("Mot de passe changé avec succès");
      } else {
        setError("Échec du changement de mot de passe.");
      }
    } catch (err) {
      setError("Erreur lors du changement de mot de passe.");
    }
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="my-5">
      <h2 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
        Profil
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {userData ? (
        <div className="flex flex-col items-center">
          <img
            src={`https://i.pravatar.cc/150?u=${userData.username}`}
            alt="Avatar"
            className="rounded-full w-32 h-32 mb-5"
          />
          {isConnectedUser && (
            <div className="bg-primary-light p-5 rounded-lg w-1/3">
              <h3 className="font-artifika text-xl font-bold text-center mb-4 text-gray-800">
                {userData.user.username}
              </h3>
            </div>
          )}
          {!isConnectedUser && (
            <div className="bg-primary-light p-5 rounded-lg w-1/3">
              <h3 className="font-artifika text-xl font-bold text-center mb-4 text-gray-800">
                {userData.username}
              </h3>
              <p className="font-artifika text-center mb-2">
                Date de création du profil :{" "}
                {new Date(userData.creationDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {isConnectedUser && (
            <div className="bg-primary-light p-5 rounded-lg w-1/3 mt-5">
              <h3 className="font-artifika text-xl font-bold text-center mb-4 text-gray-800">
                Changer le mot de passe
              </h3>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={handlePasswordChange}
                className="bg-secondary px-5 py-3 w-full text-white font-bold rounded-3xl"
              >
                Changer le mot de passe
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Chargement des informations du profil...</p>
      )}
    </div>
  );
};

export default UserProfile;
