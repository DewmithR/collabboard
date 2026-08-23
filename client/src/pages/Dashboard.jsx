import { mockUser, mockBoards, mockTasks } from "../data/mockData";
import "./Dashboard.css";

export default function Dashboard() {
  const doneCount = mockTasks.filter((t) => t.status === "done").length;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">
          Welcome back, {mockUser.name.split(" ")[0]}
        </h1>
        <p className="dashboard__subtitle">
          Here's what's happening across your boards.
        </p>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__value">{mockBoards.length}</span>
          <span className="stat-card__label">Active boards</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__value">{mockTasks.length}</span>
          <span className="stat-card__label">Total tasks</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__value">{doneCount}</span>
          <span className="stat-card__label">Completed</span>
        </div>
      </div>

      <section>
        <h2 className="dashboard__section-title">Your boards</h2>

        <div className="dashboard__boards">
          {mockBoards.map((board) => (
            <div className="board-card" key={board.id}>
              <h3 className="board-card__name">{board.name}</h3>
              <p className="board-card__meta">
                {board.taskCount} tasks · updated {board.updated}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}