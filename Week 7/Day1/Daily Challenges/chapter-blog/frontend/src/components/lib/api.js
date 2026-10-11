const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}
export const loginUser = (credentials) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getCurrentUser = () => apiRequest("/auth/me");

export const logoutUser = () =>
  apiRequest("/auth/logout", {
    method: "POST",
  });

export const getArticles = () => apiRequest("/articles");

export const getArticleById = (id) => apiRequest(`/articles/${id}`);

export const createArticle = (articleData) =>
  apiRequest("/articles", {
    method: "POST",
    body: JSON.stringify(articleData),
  });

export const updateArticle = (id, articleData) =>
  apiRequest(`/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(articleData),
  });

export const deleteArticle = (id) =>
  apiRequest(`/articles/${id}`, {
    method: "DELETE",
  });

export default apiRequest;