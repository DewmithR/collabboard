import { apiRequest } from "./client";

export async function searchUsers(query) {
  const params = new URLSearchParams({ q: query });
  return apiRequest(`/users/search?${params.toString()}`);
}