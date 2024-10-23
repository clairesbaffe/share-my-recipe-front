export const createRecipe = async (recipeData: any) => {
    const response = await fetch('http://localhost:8080/api/v1/recipes', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    return response;
};