import { apiRequest } from "./client";

export async function getTasks(boardId, filters = {}) {
  const params = new URLSearchParams();

  if (filters.columnId) {
    params.set("columnId", filters.columnId);
  }

  if (filters.assigneeId) {
    params.set("assigneeId", filters.assigneeId);
  }

  const queryString = params.toString();

  const endpoint = queryString
    ? `/boards/${boardId}/tasks?${queryString}`
    : `/boards/${boardId}/tasks`;

  return apiRequest(endpoint);
}

export async function createTask(taskData) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(taskId, taskData) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(taskId) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}
