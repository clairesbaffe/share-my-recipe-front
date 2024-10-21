import React from "react";
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-primary text-white font-artifika">
      <div className="container mx-auto">
        <header className="flex justify-between items-center px-14 py-4">
          <img
            src="/logo/logo-no-background.png"
            alt="Share My Recipe - Logo"
            className="h-20"
          />
          <div className="relative inline-block w-custom-xl h-10">
            <input
              type="text"
              className="w-full h-full pr-10 border border-gray-300 rounded-md"
            />
            <span className="text-black absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <MagnifyingGlassIcon className="h-5" />
            </span>
          </div>

          <button className="bg-secondary px-5 py-3 flex items-center gap-2 rounded-3xl">
            <UserIcon className="h-5" /> Se connecter
          </button>
          {/* <button>Profil</button> */}
        </header>

        <nav className="bg-primary-light text-black m-0 py-2">
          <ul className="flex items-center justify-evenly">
            <li>
              <a href="#" className="hover:text-gray-300">
                Dernières recettes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Recettes végétariennes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Recettes véganes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Spécial Halloween
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Dans mon frigo...
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
