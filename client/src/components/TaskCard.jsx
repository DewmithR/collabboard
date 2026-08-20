import "./TaskCard.css";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h4 className="task-card__title">{task.title}</h4>
      <p className="task-card__description">{task.description}</p>
      <div className="task-card__footer">
        <span className="task-card__assignee">{task.assignee}</span>
      </div>
    </div>
  );
}
