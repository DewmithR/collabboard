import TaskCard from "./TaskCard";
import "./Column.css";

export default function Column({ column, tasks = [], members = [], onAddTask, onEdit, onDeleted, onColumnEdit, onColumnDelete }) {
  const columnId = column._id || column.id;

  const columnTasks = tasks.filter((task) => {
    const taskColumnId =
      task.columnId?._id || task.columnId?.id || task.columnId;

    return String(taskColumnId) === String(columnId);
  });

  return (
    <div className={`column column--${columnId}`}>
      <div className="column__header">
        <h3 className="column__title">{column.title}</h3>
        <span className="column__count">{columnTasks.length}</span>
        <button
          type="button"
          className="column__add-task"
          onClick={() => onAddTask?.(column)}
        >
          + Add
        </button>
        <div className="column__actions">
          <button
            type="button"
            className="column__action"
            onClick={() => onColumnEdit?.(column)}
          >
            Edit
          </button>
          <button
            type="button"
            className="column__action column__action--danger"
            onClick={() => onColumnDelete?.(column)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="column__body">
        {columnTasks.length === 0 ? (
          <p className="column__empty">No tasks</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={task}
              members={members}
              onEdit={onEdit}
              onDeleted={onDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}