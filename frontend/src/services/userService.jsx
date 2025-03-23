import * as httpRequest from '../utils/httpRequest';

// Existing functions
export const getAllUsers = async () => {
    try {
        return await httpRequest.get('users');
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

// Add these new auth functions
export const registerUser = async (userData) => {
    try {
        const result = await httpRequest.post('users', userData);
        return result;
    } catch (error) {
        console.error('Failed to register user:', error);
        throw error;
    }
};

export const checkUserExists = async (username, email) => {
    try {
        const users = await getAllUsers();
        return {
            usernameExists: users.some(user => user.username === username),
            emailExists: users.some(user => user.email === email)
        };
    } catch (error) {
        console.error('Failed to check if user exists:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        // Get all users from API
        const users = await getAllUsers();
        
        // Find user by username
        const user = users.find(u => 
            u.username === credentials.username && 
            u.password === credentials.password
        );
        
        if (!user) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
        }
        
        // Save to localStorage (keeping your current approach)
        const loginSession = {
            id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            isLoggedIn: true
        };
        
        localStorage.setItem('loginSession', JSON.stringify(loginSession));
        return loginSession;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};