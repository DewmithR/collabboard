# CollabBoard — Client

The React front end for CollabBoard, a collaborative Kanban-style task board. Users can register/log in, create boards, organize work into columns, and create, assign, and move tasks between columns.

## Tech Stack

- **Framework:** React + Vite
- **Routing:** React Router DOM
- **Language:** JavaScript (not TypeScript)
- **Styling:** Custom dark glassmorphism theme (shared `theme.css` design tokens)

## Prerequisites

- Node.js 18+
- npm
- The backend server running (see `server/README.md`) — the client has nothing to talk to without it

## Getting Started

```bash
cd client
npm install
```

Create a `.env` file in `client/` (never committed — see `.env.example`):

```
VITE_API_URL=http://localhost:4000/api
```

Start the development server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

## Environment Variables

| Variable       | Description                 | Example                     |
| -------------- | --------------------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:4000/api` |

## Available Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Starts the Vite development server                     |
| `npm run build`   | Builds an optimized production bundle                  |
| `npm run preview` | Serves the production build locally, for a final check |
| `npm run lint`    | Runs ESLint over the project                           |

## Connecting to the Backend

All API calls are centralized in `src/api/` rather than scattered across components. A shared request helper attaches the JWT automatically:

- On login, the token returned by the server is stored in `localStorage`.
- Every subsequent request reads it and attaches `Authorization: Bearer <token>`.
- If the server responds `401` (missing, invalid, or expired token), the client clears the stored token and redirects to login, handled in one central place rather than per-component.

As of Milestone 2, the client is fully wired to the live backend — the Milestone 1 mock data module (`mockTasks.js`) has been removed, and all board/column/task data is fetched from real endpoints.

## Project Structure

```
client/
  src/
    components/     # reusable UI pieces (Board, Column, TaskCard, etc.)
    pages/            # top-level routed views (Login, Register, Board)
    context/            # AuthContext and other shared state
    api/                  # centralized API request layer
    theme.css               # shared design tokens (colors, spacing, etc.)
  .env.example
  package.json
```

## Known Limitations (Milestone 2)

- **No offline support yet** — a network drop or refresh mid-edit currently loses unsaved changes. Client-side caching (localStorage/IndexedDB) is planned for Milestone 3.
- **No real-time updates yet** — changes made by teammates won't appear until the page is refreshed. Socket.io sync is planned for Milestone 5.
- **No automated test suite yet** — Jest + React Testing Library are introduced in Milestone 4.
