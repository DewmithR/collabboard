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

export async function getBoardMembers(boardId) {
  return apiRequest(`/boards/${boardId}/members`);
}

export async function addBoardMember(boardId, memberData) {
  return apiRequest(`/boards/${boardId}/members`, {
    method: "POST",
    body: JSON.stringify(memberData),
  });
}

export async function removeBoardMember(boardId, userId) {
  return apiRequest(`/boards/${boardId}/members/${userId}`, {
    method: "DELETE",
  });
}

export async function updateBoard(boardId, boardData) {
  return apiRequest(`/boards/${boardId}`, {
    method: "PATCH",
    body: JSON.stringify(boardData),
  });
}

export async function deleteBoard(boardId) {
  return apiRequest(`/boards/${boardId}`, {
    method: "DELETE",
  });
}
