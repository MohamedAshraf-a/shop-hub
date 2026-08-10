import api from "../api/axios";

export const getProducts = (params = "") => api.get(`/products${params}`);

export const getProduct = (id) => api.get(`/products/${id}`);

export const searchProducts = (query) =>
  api.get(`/products/search?q=${query}`);

export const getCategories = () =>
  api.get("/products/categories");