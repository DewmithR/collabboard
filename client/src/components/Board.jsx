import { useRef } from "react";
import Column from "./Column";
import { mockTasks, columns } from "../Data/MockData";
import "./Board.css";

export default function Board() {
  const columnsRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div className="board">
      <div className="board__header">
        <div className="board__title-group">
          <div className="board__badge"></div>
          <div>
            <h2 className="board__title">Project Board</h2>
            <p className="board__subtitle">
              {mockTasks.length} tasks across {columns.length} stages
            </p>
          </div>
        </div>
      </div>
      <div className="board__columns" ref={columnsRef}>
        {columns.map((col, i) => (
          <div
            key={col.id}
            className="board__col-wrap"
            style={{ animationDelay: `${i * 0.08}s` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Column column={col} tasks={mockTasks} />
          </div>
        ))}
      </div>
    </div>
  );
}