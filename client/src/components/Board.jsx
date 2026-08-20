import Column from "./Column";
import { mockTasks, columns } from "../Data/MockData";
import "./Board.css";
export default function Board() {
  return (
    <div className="board">
      <div className="board__header">
        <h2 className="board__title">Project Board</h2>
      </div>
      <div className="board__columns">
        {columns.map((col) => (
          <Column key={col.id} column={col} tasks={mockTasks} />
        ))}
      </div>
    </div>
  );
}
