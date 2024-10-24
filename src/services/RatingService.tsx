export const patchUserRating = async (recipeId: number, recipeData: { rating: number }) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/ratings/${recipeId}`,
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


export const getRatesForUserAndRecipe = async (userId: number, recipeId: number) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/ratings/${recipeId}/${userId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return response.json();
}

export const deleteRating = async (recipeId: number) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/ratings/${recipeId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );
    return response;
}