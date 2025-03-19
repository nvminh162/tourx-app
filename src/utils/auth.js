/**
 * Utility functions for authentication
 */

// Check if user is logged in
export const isLoggedIn = () => {
    const loginSession = JSON.parse(localStorage.getItem('loginSession') || 'null');
    return loginSession && loginSession.isLoggedIn;
};

// Get current user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('loginSession') || 'null');
};

// Logout user
export const logout = () => {
    const loginSession = JSON.parse(localStorage.getItem('loginSession') || 'null');
    if (loginSession) {
        loginSession.isLoggedIn = false;
        localStorage.setItem('loginSession', JSON.stringify(loginSession));
    }
};

// Get all users
export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
};
