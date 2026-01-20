import API from './api';

const authService = {
    register: async (userData) => {
        const response = await API.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    login: async (userData) => {
        const response = await API.post('/auth/login', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        const response = await API.get('/auth/me');
        return response.data;
    },
};

export default authService;
