export const mockTasks = [
  { id: 1, title: "Design wireframes", description: "Sketch board layout", status: "todo", assignee: "Alice" },
  { id: 2, title: "Set up Express server", description: "Init routes/controllers", status: "doing", assignee: "Bob" },
  { id: 3, title: "Write README", description: "Setup + run instructions", status: "done", assignee: "Carl" },
  { id: 4, title: "Design database schema", description: "Model tasks, users, columns", status: "todo", assignee: "Alice" },
  { id: 5, title: "Build task API endpoints", description: "CRUD routes for tasks", status: "doing", assignee: "Bob" },
  { id: 6, title: "Style kanban board UI", description: "Add drag-and-drop styling", status: "todo", assignee: "Dana" },
  { id: 7, title: "Set up CI pipeline", description: "Lint, test, build on push", status: "doing", assignee: "Carl" },
  { id: 8, title: "Write unit tests", description: "Cover task creation/update", status: "todo", assignee: "Dana" },
  { id: 9, title: "Deploy to staging", description: "Push build to staging env", status: "done", assignee: "Bob" },
];

export const columns = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

export const mockUser = {
id: "u1",
name: "Kamal Perera",
email: "Kamal@example.com",
role: "Team Lead",
avatarInitials: "KP",
joined: "Aug 2026",
};
export const mockBoards = [
{ id: "b1", name: "CollabBoard Sprint 1", taskCount: 3, updated: "2 hours ago" },
{ id: "b2", name: "Marketing Launch", taskCount: 5, updated: "Yesterday" },
];