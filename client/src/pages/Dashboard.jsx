import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";
import { getBoards } from "../api/boards";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h2 className="dashboard__section-title">Your boards</h2>

        <div className="dashboard__boards">
          {boards.map((board) => (
            <div className="board-card" key={board.id}>
              <h3 className="board-card__name">{board.name}</h3>
              <p className="board-card__meta">
                {board.columns?.length || 0} columns · updated{" "}
                {new Date(board.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}