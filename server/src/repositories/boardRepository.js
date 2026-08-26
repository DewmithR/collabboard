let boards = [
  { id: "b1", name: "CollabBoard Sprint 1", ownerId: "u1", memberIds: ["u1"] },
];

let nextId = 2;

export const boardRepository = {
  async findAll() {
    return boards;
  },

  async findByUser(userId) {
    return boards.filter(
      (b) => b.ownerId === userId || b.memberIds.includes(userId),
    );
  },

  async findById(id) {
    return boards.find((b) => b.id === id) || null;
  },

  async create({ name, ownerId }) {
    const board = {
      id: "b" + nextId++,
      name,
      ownerId,
      memberIds: [ownerId],
    };
    boards.push(board);
    return board;
  },
};
