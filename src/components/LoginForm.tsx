import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await UserService.login(username, password);
      if (response.status === 200) {
        navigate("/");
      } else {
        alert("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
      <div className="bg-primary-light w-1/3 p-5 flex flex-col gap-5 rounded-lg">
        <h2 className="font-artifika text-3xl font-bold text-center mb-4 text-gray-800 relative">
          Connexion
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-3 items-center">
            <label htmlFor="username" className="w-1/3">Nom d'utilisateur</label>
            <input
                type="text"
                name="username"
                className="w-2/3 h-10 p-3 rounded-xl"
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="password" className="w-1/3">Mot de passe</label>
            <input
                type="password"
                name="password"
                className="w-2/3 h-10 p-3 rounded-xl"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit" className="bg-primary font-artifika font-bold w-2/3 h-10 rounded-xl m-auto">
            Me connecter
          </button>
        </form>
        <p>
          Pas de compte ?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
  );
};

export default LoginForm;