import React, { useState } from "react";
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoCreate } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserService } from "../services/UserService";

const Header = ({ showBottomPart = true }: { showBottomPart?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Dernières recettes", slug: "dernières-recettes" },
    { name: "Recettes végétariennes", slug: "recettes-végétariennes" },
    { name: "Recettes véganes", slug: "recettes-véganes" },
    { name: "Spécial Halloween", slug: "spécial-halloween" },
  ];

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await UserService.logout();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
      <header className="bg-primary text-white font-artifika container mx-auto max-w-screen-2xl">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/">
            <img
                src="/logo/logo-no-background.png"
                alt="Share My Recipe - Logo"
                className="h-16"
            />
          </Link>

          <div className="relative inline-block w-full max-w-lg h-10">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full h-full pr-10 border border-gray-300 rounded-md text-black p-2"
                placeholder="Rechercher..."
            />
            <span className="text-black absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <MagnifyingGlassIcon className="h-5" />
          </span>
          </div>

          {isAuthenticated ? (
              <div className="flex space-x-3">
                <Link to="/profile">
                  <button className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl text-sm">
                    <UserIcon className="h-4" /> Mon Profil
                  </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl text-sm"
                >
                  <UserIcon className="h-4" /> Déconnexion
                </button>
                <Link to="/create-recipe">
                  <button className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl text-sm">
                    <IoCreate className="h-4" /> Ajouter une recette
                  </button>
                </Link>
              </div>
          ) : (
              <Link to="/login">
                <button className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl text-sm">
                  <UserIcon className="h-4" /> Se connecter
                </button>
              </Link>
          )}
        </div>

        {showBottomPart && (
            <nav className="bg-primary-light text-black py-2 flex items-center justify-evenly mt-2">
              {links.map((link, index) => (
                  <button key={index}>
                    <Link
                        to={`/special/${encodeURIComponent(link.slug)}`}
                        className="hover:text-gray-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </button>
              ))}
              <button>
                <Link to="/dans-mon-frigo" className="hover:text-gray-300 text-sm">
                  Dans mon frigo...
                </Link>
              </button>
            </nav>
        )}
      </header>
  );
};

export default Header;