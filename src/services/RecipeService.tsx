export const createRecipe = async (recipeData: any) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  return response;
};

export const getAllRecipes = async (currentPage: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/public/recipes?page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getRecipeById = async (recipeId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/public/recipes/${recipeId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getLastestRecipes = async (currentPage: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/public/recipes/ordered?order=desc&sortedBy=dates&page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getRecipesByUserSession = async (currentPage: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recipes/users?page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const deleteRecipeByUserSession = async (recipeId: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const searchRecipes = async (query: string, currentPage: number) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL
    }/public/recipes/search?query=${encodeURIComponent(
      query
    )}&page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getRecipesByUserId = async (
  userId: string,
  currentPage: number
) => {
    console.log(userId, currentPage);
    
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/public/recipes/users/${userId}?limit=20&page=${currentPage}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};
