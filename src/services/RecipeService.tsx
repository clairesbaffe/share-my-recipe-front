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

export const getRecipeByIngredients = async (
  ingredients: string,
  currentPage: number
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/public/recipes/search/ingredients?ingredients=${ingredients}&limit=20&page=${currentPage}`,
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

export const searchRecipesWithFilters = async (
  query: string,
  page: number,
  limit: number,
  order: string,
  sortBy: string,
  nbPersons: number[],
  preparationTime: number[],
  exclusions: string[],
  difficulty: number,
  tags: string[]
) => {
  const url = new URL(
    `${process.env.REACT_APP_API_URL}/public/recipes/search/filters`
  );

  url.searchParams.append("query", query);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("order", order);
  url.searchParams.append("sortBy", sortBy);

  if (nbPersons.length > 0) {
    url.searchParams.append("nbPersons", nbPersons.join(","));
  }

  if (preparationTime.length === 2) {
    url.searchParams.append("preparationTime", preparationTime.join(","));
  }

  if (exclusions.length > 0) {
    url.searchParams.append("exclusions", exclusions.join(","));
  }

  url.searchParams.append("difficulty", difficulty.toString());

  if (tags.length > 0) {
    url.searchParams.append("tags", tags.join(","));
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  return response.json();
};

export const getRecipeByIdByUserSession = async (recipeId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
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
