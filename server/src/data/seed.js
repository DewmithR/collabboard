export const users = [
  { id: 'u1', name: 'Amanda', email: 'amanda@collabboard.dev', passwordHash: '<bcrypt-hash>' },
  { id: 'u2', name: 'Dulan', email: 'dulan@collabboard.dev', passwordHash: '<bcrypt-hash>' },
  { id: 'u3', name: 'Udara', email: 'udara@collabboard.dev', passwordHash: '<bcrypt-hash>' },
]

export const boards = [
  { id: 'b1', name: 'CollabBoard Sprint 1', ownerId: 'u1', memberIds: ['u1', 'u2', 'u3'] },
  { id: 'b2', name: 'CollabBoard Backlog', ownerId: 'u2', memberIds: ['u1', 'u2'] },
]

export const columns = [
  { id: 'c1', boardId: 'b1', name: 'To Do', order: 0 },
  { id: 'c2', boardId: 'b1', name: 'Doing', order: 1 },
  { id: 'c3', boardId: 'b1', name: 'Done', order: 2 },
  { id: 'c4', boardId: 'b2', name: 'To Do', order: 0 },
  { id: 'c5', boardId: 'b2', name: 'Doing', order: 1 },
  { id: 'c6', boardId: 'b2', name: 'Done', order: 2 },
]

export const tasks = [
  { id: 't1', boardId: 'b1', columnId: 'c1', title: 'Set up repo', assigneeId: 'u1', priority: 'normal' },
  { id: 't2', boardId: 'b1', columnId: 'c1', title: 'Design DB schema', assigneeId: 'u2', priority: 'high' },
  { id: 't3', boardId: 'b1', columnId: 'c2', title: 'Build auth routes', assigneeId: 'u3', priority: 'high' },
  { id: 't4', boardId: 'b1', columnId: 'c2', title: 'Write board CRUD', assigneeId: 'u1', priority: 'normal' },
  { id: 't5', boardId: 'b1', columnId: 'c3', title: 'Init project config', assigneeId: 'u1', priority: 'low' },
  { id: 't6', boardId: 'b2', columnId: 'c4', title: 'Plan M3 features', assigneeId: 'u2', priority: 'low' },
]