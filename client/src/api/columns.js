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
