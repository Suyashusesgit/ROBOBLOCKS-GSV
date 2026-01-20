import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await authService.getCurrentUser();
                setCurrentUser(res.data); // Assuming res.data contains user info
            } catch (err) {
                console.error("Session expired or invalid token");
                localStorage.removeItem('token');
                setCurrentUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login({ email, password });
            setCurrentUser(data); // data might contain token and user info or just token.
            await checkLoggedIn(); // Fetch full user profile after login
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await authService.register({ name, email, password });
            setCurrentUser(data);
            await checkLoggedIn();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
