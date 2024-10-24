export const createRecipe = async (recipeData: any) => {
  const response = await fetch("http://localhost:8080/api/v1/recipes", {
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
    `http://localhost:8080/api/v1/public/recipes?page=${currentPage}`,
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
    `http://localhost:8080/api/v1/public/recipes/${recipeId}`,
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
    `http://localhost:8080/api/v1/public/recipes/ordered?order=desc&sortedBy=dates&page=${currentPage}`,
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

export const getRecipesByUserSession = async () => {
  const response = await fetch(
    "http://localhost:8080/api/v1/recipes/users",
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
    `http://localhost:8080/api/v1/recipes/${recipeId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}