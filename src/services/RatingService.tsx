export const patchUserRating = async (recipeId: number, recipeData: {rating: number}) => {
  const response = await fetch(
    `http://localhost:8086/api/v1/ratings/${recipeId}`,
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
