import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users");

        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    function register(userData) {
        const existingUser = users.find(
            (user) => user.email === userData.email
        );

        if (existingUser) {
            return {
                success: false,
                message: "Email sudah terdaftar.",
            };
        }

        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
        };

        setUsers((prevUsers) => [
            ...prevUsers,
            newUser,
        ]);

        return {
            success: true,
            message: "Registrasi berhasil.",
        };
    }

    function login(email, password) {
        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (!user) {
            return {
                success: false,
                message: "Email atau password salah.",
            };
        }

        setCurrentUser(user);

        return {
            success: true,
            message: "Login berhasil.",
        };
    }

    function logout() {
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        isAuthenticated: Boolean(currentUser),
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;