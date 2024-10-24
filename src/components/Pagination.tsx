import React from "react";

const Pagination = ({
  currentPage,
  hasNextPage,
  onPageChange,
}: {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (value: number) => void;
}) => {
  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex space-x-2">
        {/* Back button */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={`px-4 py-2 bg-primary-light text-primary rounded-md hover:bg-primary-medium flex items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Précédent
            </button>
          </li>
        )}

        {/* Next button */}
        {hasNextPage && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={`px-4 py-2 bg-primary-light text-primary rounded-md hover:bg-primary-medium flex items-center`}
            >
              Suivant
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
