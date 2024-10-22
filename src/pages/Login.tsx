import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-5">
      <h2 className="font-artifika text-3xl font-bold text-center mb-8 text-gray-800 relative">
        Connexion
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full"></span>
      </h2>
      <p>
        Pas de compte ?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default Login;
