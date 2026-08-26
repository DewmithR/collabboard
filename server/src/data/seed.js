export const users = [
{ id: 'u1', name: 'Amanda', email: 'amanda@collabboard.dev', passwordHash: '<bcrypt-hash>' },
]
export const boards = [
{ id: 'b1', name: 'CollabBoard Sprint 1', ownerId: 'u1', memberIds: ['u1'] },
]
export const columns = [
{ id: 'c1', boardId: 'b1', name: 'To Do', order: 0 },
{ id: 'c2', boardId: 'b1', name: 'Doing', order: 1 },
{ id: 'c3', boardId: 'b1', name: 'Done', order: 2 },
]
export const tasks = [
{ id: 't1', boardId: 'b1', columnId: 'c1', title: 'Set up repo', assigneeId: 'u1', priority:
'normal' },
]