import React, { useState, useEffect } from "react";

const LoadingComponent = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-smooth-spin"></div>
      {showMessage && (
        <p className="mt-4 text-center">
          Si le chargement est trop long, il se peut que certaines
          fonctionnalités nécessitent une connexion. Merci de vous assurer que
          vous êtes bien connecté.
        </p>
      )}
    </div>
  );
};

export default LoadingComponent;
