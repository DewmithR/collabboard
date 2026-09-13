import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import { getBoards, createBoard } from "../api/boards";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [creatingBoard, setCreatingBoard] = useState(false);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [userData, boardsData] = await Promise.all([
          getCurrentUser(),
          getBoards(),
        ]);
        setUser(userData);
        setBoards(boardsData);
      } catch (err) {
        setError(err.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">Error: {error}</div>;
  }

  const firstName = user?.name?.split(" ")[0] || "there";
  const totalColumns = boards.reduce(
    (sum, b) => sum + (b.columns?.length || 0),
    0
  );

  async function handleCreateBoard(e) {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    setCreatingBoard(true);
    setCreateError(null);

    try {
      await createBoard({ name: newBoardName.trim() });
      setNewBoardName("");
      setIsBoardFormOpen(false);
      const boardsData = await getBoards();
      setBoards(boardsData);
    } catch (err) {
      setCreateError(err.message || "Failed to create board.");
    } finally {
      setCreatingBoard(false);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Welcome back, {firstName}</h1>
        <p className="dashboard__subtitle">
          Here's what's happening across your boards.
        </p>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__value">{boards.length}</span>
          <span className="stat-card__label">Active boards</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__value">{totalColumns}</span>
          <span className="stat-card__label">Total columns</span>
        </div>
      </div>

      <section>
        <div className="dashboard__section-row">
          <h2 className="dashboard__section-title">Your boards</h2>
          <button
            type="button"
            className="dashboard__new-board-btn"
            onClick={() => setIsBoardFormOpen((v) => !v)}
          >
            {isBoardFormOpen ? "Cancel" : "+ New board"}
          </button>
        </div>

        {isBoardFormOpen && (
          <form className="dashboard__new-board-form" onSubmit={handleCreateBoard}>
            <input
              type="text"
              placeholder="Board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              required
            />
            <button type="submit" disabled={creatingBoard}>
              {creatingBoard ? "Creating…" : "Create"}
            </button>
            {createError && (
              <p className="dashboard__new-board-error">{createError}</p>
            )}
          </form>
        )}

        <div className="dashboard__boards">
          {boards.length === 0 && (
            <p className="dashboard__empty">
              No boards yet. Create your first board to get started.
            </p>
          )}
          {boards.map((board) => (
            <Link to={`/board/${board.id}`} className="board-card" key={board.id}>
              <h3 className="board-card__name">{board.name}</h3>
              <p className="board-card__meta">
                {board.columns?.length || 0} columns · updated{" "}
                {new Date(board.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}