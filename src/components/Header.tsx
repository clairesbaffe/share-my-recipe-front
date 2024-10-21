import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="#">MyWebsite</a>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Services</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
