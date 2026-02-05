import axios from 'axios';

/**
 * Purpose: Centralized Axios instance for API communication.
 * Inputs: Requests to VITE_API_BASE_URL.
 * Outputs: Promises resolving to response data.
 * Side Effects: Attaches x-auth-token header if present in localStorage.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://foundryappserver.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor (Auth Token)
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response Interceptor (Error Handling)
api.interceptors.response.use(
    response => {
        // Return data directly if success, strictly following the new generic format
        // Backend returns { success: true, data: ... }
        return response.data; // This will return { success, data }
    },
    error => {
        // Check for request cancellation
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        // Network Error / Server Down
        if (!error.response) {
            return Promise.reject({
                code: 'SERVER_DOWN',
                message: 'Service temporarily unavailable'
            });
        }

        // Backend returned strictly formatted error: { success: false, error: { code, message } }
        const backendError = error.response.data?.error;

        // Fallback if backend didn't return standard format (e.g. 404 HTML)
        if (!backendError) {
            return Promise.reject({
                code: error.response.status === 404 ? 'NOT_FOUND' : 'UNKNOWN_ERROR',
                message: 'An unexpected error occurred'
            });
        }

        return Promise.reject(backendError);
    }
);

// Profile APIs
export const getProfile = () => api.get('/profile/me');
export const updateProfile = (data) => api.put('/profile/me', data);
export const getCategories = () => api.get('/categories');
export const getCategoryStats = () => api.get('/products/categories/stats');

// Collections
export const getCollections = () => api.get('/collections');

export const getCollectionBySlug = (slug) => api.get(`/collections/${slug}`);

export default api;
