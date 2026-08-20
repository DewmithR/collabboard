import TaskCard from "./TaskCard";
import "./Column.css";

export default function Column({ column, tasks }) {
  const columnTasks = tasks.filter((t) => t.status === column.id);

  return (
    <div className={`column column--${column.id}`}>
      <div className="column__header">
        <h3 className="column__title">{column.title}</h3>
        <span className="column__count">{columnTasks.length}</span>
      </div>
      <div className="column__body">
        {columnTasks.length === 0 ? (
          <p className="column__empty">No tasks</p>
        ) : (
          columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
