import axios from "axios";

const token = import.meta.env.VITE_TMDB_API_TOKEN?.trim();
const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim();
const baseURL = import.meta.env.VITE_TMDB_BASE_URL?.trim() || "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL,
  params: {
    language: "pt-BR",
  },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.params = config.params ?? {};

  if (apiKey) {
    config.params.api_key = apiKey;
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
