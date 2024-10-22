import React, { useState } from "react";
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ showBottomPart = true }: { showBottomPart?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Redirige vers la page de recherche avec le paramètre
    }
  };

  return (
    <header className="bg-primary text-white font-artifika container mx-auto">
      <header className="flex justify-between items-center px-14 py-4">
        <Link to="/">
          <img
            src="/logo/logo-no-background.png"
            alt="Share My Recipe - Logo"
            className="h-20"
          />
        </Link>

        <div className="relative inline-block w-custom-xl h-10">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full pr-10 border border-gray-300 rounded-md text-black p-3"
            placeholder="Rechercher..."
          />
          <span className="text-black absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <MagnifyingGlassIcon className="h-5" />
          </span>
        </div>

        <Link to="/login">
          <button className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl">
            <UserIcon className="h-5" /> Se connecter
          </button>
        </Link>

        {/* <button>Profil</button> */}
      </header>

      {showBottomPart && (
        <nav className="bg-primary-light text-black m-0 py-2 flex items-center justify-evenly">
          {links.map((link, index) => (
            <button key={index}>
              <Link
                to={`/special/${encodeURIComponent(link.slug)}`}
                className="hover:text-gray-300"
              >
                {link.name}
              </Link>
            </button>
          ))}
          <button>
            <Link to={"/dans-mon-frigo"} className="hover:text-gray-300">
              Dans mon frigo...
            </Link>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
