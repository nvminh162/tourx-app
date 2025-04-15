import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request interceptor for debugging
httpRequest.interceptors.request.use(
    config => {
        console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
        return config;
    },
    error => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
httpRequest.interceptors.response.use(
    response => {
        console.log(`API Response from ${response.config.url}:`, response.data);
        return response;
    },
    error => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const get = async (path, options = {}) => {
    try {
        const response = await httpRequest.get(path, options);
        return response.data; //point to axios data to get data
    } catch (error) {
        console.error(`Failed to GET ${path}:`, error);
        throw error;
    }
};

export const post = async (path, data, options = {}) => {
    try {
        const response = await httpRequest.post(path, data, options);
        return response.data;
    } catch (error) {
        console.error(`Failed to POST to ${path}:`, error);
        throw error;
    }
};

export const put = async (path, data, options = {}) => {
    try {
        const response = await httpRequest.put(path, data, options);
        return response.data;
    } catch (error) {
        console.error(`Failed to PUT to ${path}:`, error);
        throw error;
    }
};

export const deleteRequest = async (path, options = {}) => {
    try {
        const response = await httpRequest.delete(path, options);
        return response.data;
    } catch (error) {
        console.error(`Failed to DELETE ${path}:`, error);
        throw error;
    }
};

export default httpRequest;
