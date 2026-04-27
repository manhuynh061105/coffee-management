import axios from 'axios';

// Ưu tiên dùng biến môi trường, mặc định là link Render của bạn
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true // Chỉ mở lại nếu Backend dùng Cookie
});

// Interceptor cho Request: Tự động đính kèm Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho Response: Xử lý khi Token hết hạn (Lỗi 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Nếu Token hết hạn hoặc không hợp lệ, xóa dữ liệu và về trang login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;