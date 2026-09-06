import { useRef, useState, useEffect } from "react";
import Column from "./Column";
import { getBoards } from "../api/boards";
import { getColumns } from "../api/columns";
import { getTasks } from "../api/tasks";
import "./Board.css";

export default function Board() {
  const columnsRef = useRef(null);

  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBoardData() {
      setLoading(true);
      setError(null);

      try {
        const boards = await getBoards();

        if (!boards || boards.length === 0) {
          if (isMounted) {
            setError("No boards found for this account yet.");
            setLoading(false);
          }
          return;
        }

        const firstBoard = boards[0];
        const boardId = firstBoard._id || firstBoard.id;

        const [columnsData, tasksData] = await Promise.all([
          getColumns(boardId),
          getTasks(boardId),
        ]);

        if (isMounted) {
          setBoard(firstBoard);
          setColumns(columnsData || []);
          setTasks(tasksData || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load board data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBoardData();

    return () => {
      isMounted = false;
    };
  }, []);

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

  if (loading) {
    return (
      <div className="board">
        <p className="board__subtitle">Loading board…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board">
        <p className="board__subtitle">Couldn't load board: {error}</p>
      </div>
    );
  }

  return (
    <div className="board">
      <div className="board__header">
        <div className="board__title-group">
          <div className="board__badge"></div>
          <div>
            <h2 className="board__title">{board?.name || "Project Board"}</h2>
            <p className="board__subtitle">
              {tasks.length} tasks across {columns.length} stages
            </p>
          </div>
        </div>
      </div>
      <div className="board__columns" ref={columnsRef}>
        {columns.map((col, i) => {
          const colId = col._id || col.id;
          return (
            <div
              key={colId}
              className="board__col-wrap"
              style={{ animationDelay: `${i * 0.08}s` }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Column column={col} tasks={tasks} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
