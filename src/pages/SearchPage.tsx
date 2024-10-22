import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div className="mt-5 flex flex-col items-center">
      <div>Recherche avancée</div>
      <div>Résultats de recherche pour : {query}</div>
    </div>
  );
};

export default SearchPage;
