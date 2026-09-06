import { apiRequest } from "./client";

export async function getBoards() {
  return apiRequest("/boards");
}

export async function getBoard(boardId) {
  return apiRequest(`/boards/${boardId}`);
}

export async function createBoard(boardData) {
  return apiRequest("/boards", {
    method: "POST",
    body: JSON.stringify(boardData),
  });
}
