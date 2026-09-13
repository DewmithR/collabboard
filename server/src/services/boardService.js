import * as boardRepository from "../repositories/boardRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as taskRepository from "../repositories/taskRepository.js";
import { NotFoundError, ForbiddenError, ValidationError, AppError } from "../utils/AppError.js";

export async function listForUser(userId) {
  return boardRepository.findByUser(userId);
}

export async function create(userId, data) {
  if (!data.name || !data.name.trim()) {
    throw new ValidationError([{ message: "Board name is required" }]);
  }
  return boardRepository.create({ name: data.name.trim(), ownerId: userId });
}

export async function update(boardId, actorId, data) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  assertOwner(board, actorId);

  if (!data.name || !data.name.trim()) {
    throw new ValidationError([{ message: "Board name is required" }]);
  }

  return boardRepository.update(boardId, { name: data.name.trim() });
}

export async function remove(boardId, actorId) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  assertOwner(board, actorId);

  await boardRepository.remove(boardId);
  await taskRepository.removeByBoard(boardId);
}

export async function getForUser(boardId, userId) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  const isMember =
    board.ownerId === userId ||
    board.members.some((m) => m.userId === userId);
  if (!isMember) throw new ForbiddenError();
  return board;
}

export async function listMembers(boardId, userId) {
  const board = await getForUser(boardId, userId);
  return resolveMembers(board);
}

export async function addMember(boardId, actorId, memberUserId) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  assertOwner(board, actorId);

  const user = await userRepository.findById(memberUserId);
  if (!user) throw new NotFoundError("User");

  const isExisting =
    String(board.ownerId) === String(memberUserId) ||
    board.members.some((m) => String(m.userId) === String(memberUserId));
  if (isExisting) {
    throw new AppError(
      "User is already a member of this board",
      400,
      "MEMBER_EXISTS"
    );
  }

  const updated = await boardRepository.pushMember(boardId, {
    userId: memberUserId,
    role: "editor",
  });
  return resolveMembers(updated);
}

export async function removeMember(boardId, actorId, memberUserId) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  assertOwner(board, actorId);

  if (String(board.ownerId) === String(memberUserId)) {
    throw new AppError("The board owner cannot be removed", 400, "OWNER_IMMUTABLE");
  }

  const isMember = board.members.some((m) => String(m.userId) === String(memberUserId));
  if (!isMember) {
    throw new AppError("User is not a member of this board", 400, "NOT_A_MEMBER");
  }

  const updated = await boardRepository.pullMember(boardId, memberUserId);
  await taskRepository.unassignByAssignee(boardId, memberUserId);
  return resolveMembers(updated);
}

function assertOwner(board, actorId) {
  if (String(board.ownerId) !== String(actorId)) {
    throw new ForbiddenError("Only the board owner can manage members");
  }
}

async function resolveMembers(board) {
  const memberEntries = [...board.members];
  const ownerIncluded = memberEntries.some(
    (m) => String(m.userId) === String(board.ownerId)
  );
  if (!ownerIncluded) {
    memberEntries.push({ userId: board.ownerId, role: "owner" });
  }

  const users = await userRepository.findByIds(
    memberEntries.map((m) => m.userId)
  );
  const userMap = new Map(users.map((u) => [String(u.id), u]));

  const unique = new Map();
  for (const entry of memberEntries) {
    const key = String(entry.userId);
    if (unique.has(key) || !userMap.has(key)) continue;
    unique.set(key, {
      userId: key,
      role: entry.role,
      name: userMap.get(key).name,
      email: userMap.get(key).email,
    });
  }

  return Array.from(unique.values());
}