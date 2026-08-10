import axios from "axios";

// Base API configuration for DummyJSON
const api = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Flag to prevent multiple refresh token calls (if needed later)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add token if available
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

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip if it's a refresh token request or already retried
    if (originalRequest.url?.includes('/auth/refresh') || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized (if DummyJSON supports authentication)
    if (error.response?.status === 401) {
      // If we're already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh endpoint (DummyJSON might not support this)
        const { data } = await axios.post(
          `https://dummyjson.com/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        // Save new tokens
        if (data.token) {
          localStorage.setItem('token', data.token);
          
          // Update Authorization header
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          
          // Process queued requests
          processQueue(null, data.token);
          
          // Retry the original request
          return api(originalRequest);
        } else {
          throw new Error('No token in response');
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Request setup error
      console.error('Request Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions for API calls
export const apiService = {
  // GET request
  get: (url, config = {}) => api.get(url, config),
  
  // POST request
  post: (url, data, config = {}) => api.post(url, data, config),
  
  // PUT request
  put: (url, data, config = {}) => api.put(url, data, config),
  
  // PATCH request
  patch: (url, data, config = {}) => api.patch(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => api.delete(url, config),
  
  // Upload file (DummyJSON might not support this)
  upload: (url, file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress ? (event) => {
        const progress = Math.round((event.loaded * 100) / event.total);
        onProgress(progress);
      } : undefined,
    });
  },
  
  // Download file
  download: (url, filename = 'download') => {
    return api.get(url, { 
      responseType: 'blob' 
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  }
};

// Auth API functions (DummyJSON supports auth)
export const authAPI = {
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },
  
  refreshToken: (refreshToken) => 
    api.post('/auth/refresh', { refreshToken }),
  
  forgotPassword: (email) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, password) => 
    api.post('/auth/reset-password', { token, password }),
  
  // DummyJSON specific: Get current user
  getMe: () => api.get('/auth/me'),
};

// Products API functions (DummyJSON)
export const productAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  
  getById: (id) => api.get(`/products/${id}`),
  
  create: (data) => api.post('/products/add', data),
  
  update: (id, data) => api.put(`/products/${id}`, data),
  
  delete: (id) => api.delete(`/products/${id}`),
  
  search: (query) => api.get('/products/search', { params: { q: query } }),
  
  getCategories: () => api.get('/products/categories'),
  
  getByCategory: (category) => api.get(`/products/category/${category}`),
  
  // DummyJSON specific: Get product reviews
  getReviews: (id) => api.get(`/products/${id}/reviews`),
  
  // DummyJSON specific: Get product with details
  getWithDetails: (id) => api.get(`/products/${id}?select=title,description,price,rating,images,thumbnail,discountPercentage,stock,category`),
};

// Cart API functions (DummyJSON)
export const cartAPI = {
  // DummyJSON specific: Get cart by user ID
  getByUser: (userId) => api.get(`/carts/user/${userId}`),
  
  get: (id) => api.get(`/carts/${id}`),
  
  add: (userId, products) => 
    api.post('/carts/add', { userId, products }),
  
  update: (id, products) => 
    api.put(`/carts/${id}`, { products }),
  
  remove: (id) => 
    api.delete(`/carts/${id}`),
  
  // DummyJSON specific: Get all carts
  getAll: () => api.get('/carts'),
};

// Users API functions (DummyJSON)
export const userAPI = {
  getAll: (params = {}) => api.get('/users', { params }),
  
  getById: (id) => api.get(`/users/${id}`),
  
  create: (data) => api.post('/users/add', data),
  
  update: (id, data) => api.put(`/users/${id}`, data),
  
  delete: (id) => api.delete(`/users/${id}`),
  
  // DummyJSON specific: Get user carts
  getCarts: (id) => api.get(`/users/${id}/carts`),
  
  // DummyJSON specific: Get user posts
  getPosts: (id) => api.get(`/users/${id}/posts`),
  
  // DummyJSON specific: Get user todos
  getTodos: (id) => api.get(`/users/${id}/todos`),
};

// Posts API functions (DummyJSON)
export const postAPI = {
  getAll: (params = {}) => api.get('/posts', { params }),
  
  getById: (id) => api.get(`/posts/${id}`),
  
  create: (data) => api.post('/posts/add', data),
  
  update: (id, data) => api.put(`/posts/${id}`, data),
  
  delete: (id) => api.delete(`/posts/${id}`),
  
  getByUser: (userId) => api.get(`/posts/user/${userId}`),
  
  getComments: (postId) => api.get(`/posts/${postId}/comments`),
  
  // DummyJSON specific: Add comment
  addComment: (postId, data) => 
    api.post(`/posts/${postId}/comments/add`, data),
};

// Comments API functions (DummyJSON)
export const commentAPI = {
  getAll: (params = {}) => api.get('/comments', { params }),
  
  getById: (id) => api.get(`/comments/${id}`),
  
  create: (data) => api.post('/comments/add', data),
  
  update: (id, data) => api.put(`/comments/${id}`, data),
  
  delete: (id) => api.delete(`/comments/${id}`),
  
  getByPost: (postId) => api.get(`/comments/post/${postId}`),
};

// Todos API functions (DummyJSON)
export const todoAPI = {
  getAll: (params = {}) => api.get('/todos', { params }),
  
  getById: (id) => api.get(`/todos/${id}`),
  
  create: (data) => api.post('/todos/add', data),
  
  update: (id, data) => api.put(`/todos/${id}`, data),
  
  delete: (id) => api.delete(`/todos/${id}`),
  
  getByUser: (userId) => api.get(`/todos/user/${userId}`),
};

// Quotes API functions (DummyJSON)
export const quoteAPI = {
  getAll: (params = {}) => api.get('/quotes', { params }),
  
  getById: (id) => api.get(`/quotes/${id}`),
  
  getRandom: () => api.get('/quotes/random'),
};

// Wishlist API functions (Custom - DummyJSON doesn't have this)
export const wishlistAPI = {
  get: () => api.get('/carts?limit=1'), // Use carts as wishlist
  add: (productId) => {
    // DummyJSON doesn't support wishlist directly, so we'll use cart
    return api.post('/carts/add', { 
      userId: 1, 
      products: [{ id: productId, quantity: 1 }] 
    });
  },
  remove: (productId) => {
    // Custom implementation needed
    return api.delete(`/carts/${productId}`);
  },
  toggle: (productId) => {
    // Custom implementation
    return api.post('/carts/add', { 
      userId: 1, 
      products: [{ id: productId, quantity: 1 }] 
    });
  },
};

// Export default API
export default api;