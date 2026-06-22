export const useAuth = () => {
    return {
        logout: () => {
            console.log("Logout clicked");
        },
        user: {
            name: "Test User",
        }
    };
};
