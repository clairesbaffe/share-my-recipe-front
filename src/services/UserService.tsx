export const UserService = {
    register: async (username: string, password: string) => {
        const response = await fetch("http://localhost:8080/api/v1/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        return response;
    },

    login: async (username: string, password: string) => {
        const response = await fetch("http://localhost:8080/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        return response;
    },
};