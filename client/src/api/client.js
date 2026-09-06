const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export class ApiError extends Error {
  constructor(message, status, code = null, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      "Unable to connect to the server. Please make sure the backend is running.",
      0,
      "NETWORK_ERROR",
    );
  }

  if (response.status === 204) {
    return null;
  }

  let responseBody;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const error = responseBody?.error;

    throw new ApiError(
      error?.message || `Request failed with status ${response.status}`,
      response.status,
      error?.code || null,
      error?.details || null,
    );
  }

  return responseBody?.data;
}

export function clearAuthToken() {
  localStorage.removeItem("token");
}

export function getAuthToken() {
  return localStorage.getItem("token");
}
