import { useState } from "react";
import { deleteTask } from "../api/tasks";
import "./TaskCard.css";

export default function TaskCard({ task, onEdit, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setIsDeleting(true);
    setError(null);
    try {
      await deleteTask(task._id);
      onDeleted?.(task._id); // let parent remove it from state
    } catch (err) {
      setError("Failed to delete task.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="task-card">
      <h4 className="task-card__title">{task.title}</h4>
      <p className="task-card__description">{task.description}</p>

      <div className="task-card__meta">
        {task.priority && (
          <span className={`task-card__priority task-card__priority--${task.priority}`}>
            {task.priority}
          </span>
        )}
        {task.dueDate && (
          <span className="task-card__due-date">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {error && <p className="task-card__error">{error}</p>}

      <div className="task-card__footer">
        {task.assigneeId && (
          <span className="task-card__assignee">{task.assigneeId}</span>
        )}
        <div className="task-card__actions">
          <button
            type="button"
            className="task-card__edit-btn"
            onClick={() => onEdit?.(task)}
          >
            Edit
          </button>
          <button
            type="button"
            className="task-card__delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}