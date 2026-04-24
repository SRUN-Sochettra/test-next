"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on first render
    // Verify both "user" and "token" exist to prevent UI/auth desync
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("user");
            const savedToken = localStorage.getItem("token");

            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser));
            } else {
                // Desync detected: one exists without the other — clean up
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch (err) {
            console.error("Failed to load user:", err);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    // Listen for auth-expired events from API interceptor (handleAuthError)
    useEffect(() => {
        const onAuthExpired = () => setUser(null);
        window.addEventListener("auth-expired", onAuthExpired);
        return () => window.removeEventListener("auth-expired", onAuthExpired);
    }, []);

    const loginUser = (userData) => {
        // The API response should contain a token field (e.g. data.token)
        // Store the token separately so authHelper.js can read it
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isAdmin = () => {
        return user?.role === "ADMIN";
    };

    const isLoggedIn = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                logoutUser,
                isAdmin,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}