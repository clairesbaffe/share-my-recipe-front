export const UserService = {
    register: async (username: string, password: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
            credentials: 'include',
        });
        return response;
    },

    login: async (username: string, password: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
            credentials: 'include',
        });
        return response;
    },

    logout: async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "POST",
            credentials: 'include',
        });
        return response;
    },

    me: async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
            method: "GET",
            credentials: 'include',
        });
        return response;
    },

    changePassword: async (newPassword: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/changepassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({newPassword}),
        });
        return response;
    },

    getUserById: async (userId: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/public/users/${userId}`, {
            method: "GET",
            credentials: 'include',
        });
        return response;
    }
};