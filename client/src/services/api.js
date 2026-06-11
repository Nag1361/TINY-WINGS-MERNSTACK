import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: (name, email, password, confirmPassword) =>
    api.post('/auth/register', { name, email, password, confirmPassword }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getCurrentUser: () =>
    api.get('/auth/me'),

  updateProfile: (formData) =>
    api.put('/auth/updateprofile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// User Service
export const userService = {
  getAllUsers: () =>
    api.get('/users'),

  getUserById: (id) =>
    api.get(`/users/${id}`),

  deleteUser: (id) =>
    api.delete(`/users/${id}`),

  updateUserRole: (id, role) =>
    api.put(`/users/${id}/role`, { role }),
};

// Child Service
export const childService = {
  createChild: (formData) =>
    api.post('/children', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getChildren: () =>
    api.get('/children'),

  getChildById: (id) =>
    api.get(`/children/${id}`),

  updateChild: (id, formData) =>
    api.put(`/children/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteChild: (id) =>
    api.delete(`/children/${id}`),
};

// Growth Service
export const growthService = {
  addGrowthRecord: (childId, data) =>
    api.post(`/growth/${childId}`, data),

  getGrowthRecords: (childId) =>
    api.get(`/growth/${childId}`),

  updateGrowthRecord: (recordId, data) =>
    api.put(`/growth/${recordId}`, data),

  deleteGrowthRecord: (recordId) =>
    api.delete(`/growth/${recordId}`),
};

// Article Service
export const articleService = {
  createArticle: (formData) =>
    api.post('/articles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getArticles: (category) => {
    const params = category ? { category } : {};
    return api.get('/articles', { params });
  },

  getArticleById: (id) =>
    api.get(`/articles/${id}`),

  updateArticle: (id, formData) =>
    api.put(`/articles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteArticle: (id) =>
    api.delete(`/articles/${id}`),
};

// Product Service
export const productService = {
  createProduct: (formData) =>
    api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getProducts: (category, search, page, limit) => {
    const params = { page, limit };
    if (category) params.category = category;
    if (search) params.search = search;
    return api.get('/products', { params });
  },

  getProductById: (id) =>
    api.get(`/products/${id}`),

  updateProduct: (id, formData) =>
    api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteProduct: (id) =>
    api.delete(`/products/${id}`),

  addReview: (id, rating, comment) =>
    api.post(`/products/${id}/review`, { rating, comment }),
};

// Order Service
export const orderService = {
  createOrder: (products, shippingAddress) =>
    api.post('/orders', { products, shippingAddress }),

  getUserOrders: () =>
    api.get('/orders'),

  getOrderById: (id) =>
    api.get(`/orders/${id}`),

  updateOrderStatus: (id, orderStatus, paymentStatus) =>
    api.put(`/orders/${id}`, { orderStatus, paymentStatus }),

  getAllOrders: () =>
    api.get('/orders/admin/all'),
};

// Community Service
export const communityService = {
  createPost: (formData) =>
    api.post('/community/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getAllPosts: (page, limit) =>
    api.get('/community/posts', { params: { page, limit } }),

  likePost: (id) =>
    api.post(`/community/posts/${id}/like`),

  addComment: (id, comment) =>
    api.post(`/community/posts/${id}/comment`, { comment }),

  deletePost: (id) =>
    api.delete(`/community/posts/${id}`),
};

// Notification Service
export const notificationService = {
  createContact: (name, email, subject, message) =>
    api.post('/notifications/contact', { name, email, subject, message }),

  getNotifications: () =>
    api.get('/notifications'),

  markAsRead: (id) =>
    api.put(`/notifications/${id}`),

  createNotification: (title, message, type, userId, sendToAll) =>
    api.post('/notifications', { title, message, type, userId, sendToAll }),

  getAllContacts: () =>
    api.get('/notifications/contact'),

  updateContactStatus: (id, status) =>
    api.put(`/notifications/contact/${id}`, { status }),
};

export default api;
