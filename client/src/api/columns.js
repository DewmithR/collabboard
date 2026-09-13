import { apiRequest } from "./client";

export async function getColumns(boardId) {
  return apiRequest(`/boards/${boardId}/columns`);
}

export async function createColumn(boardId, columnData) {
  return apiRequest(`/boards/${boardId}/columns`, {
    method: "POST",
    body: JSON.stringify(columnData),
  });
}

export async function updateColumn(boardId, columnId, columnData) {
  return apiRequest(`/boards/${boardId}/columns/${columnId}`, {
    method: "PATCH",
    body: JSON.stringify(columnData),
  });
}

export async function deleteColumn(boardId, columnId) {
  return apiRequest(`/boards/${boardId}/columns/${columnId}`, {
    method: "DELETE",
  });
}
