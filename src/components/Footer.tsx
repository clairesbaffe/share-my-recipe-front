import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importez des icônes si besoin

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6 pl-12 pr-24">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-12">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebook size={48} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter size={48} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram size={48} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={48} />
          </a>
        </div>

        <div className="flex flex-col items-center">
          <img src="/logo/logo-white.png" alt="Logo du Site" className="h-24 mb-2" /> {/* Ajustez la taille du logo */}
          <p className="text-sm">&copy; {new Date().getFullYear()} Share My Recipe. Tous droits réservés.</p>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-lg font-bold mb-2">Liens</h2>
          <ul className="flex flex-col items-end space-y-1">
            <li><a href="/" className="hover:underline">Accueil</a></li>
            <li><a href="/search" className="hover:underline">Rechercher</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
