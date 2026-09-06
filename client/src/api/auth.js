import { apiRequest, clearAuthToken, getAuthToken } from "./client";

export async function registerUser({ name, email, password }) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function loginUser({ email, password }) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  localStorage.setItem("token", result.token);

  return result.user;
}

export async function getCurrentUser() {
  return apiRequest("/auth/me");
}

export function logoutUser() {
  clearAuthToken();
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

// Aliases used by the Login and Register components
export const login = loginUser;
export const register = registerUser;
