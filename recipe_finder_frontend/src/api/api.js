import axios from 'axios';

// Base URL chung
const API_BASE_URL = 'http://localhost:3000/api';

// Hàm gọi API chung
export const apiRequest = async (method, url, data = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem("token");
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
