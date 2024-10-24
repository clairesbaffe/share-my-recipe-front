export const patchUserRating = async (recipeId: number, recipeData: {rating: number}) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/ratings/${recipeId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    }
  );
  return response;
};


export const getRatesForUserAndRecipe = async (userId: number, recipeId: number) =>{
  const response = await fetch(
    `http://localhost:8080/api/v1/ratings/${recipeId}/${userId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response.json();
}

export const deleteRating = async (recipeId: number) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/ratings/${recipeId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  return response;
}