import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { getCurrentUser } from "../api/auth";
import { getBoard, getBoardMembers, addBoardMember, removeBoardMember, updateBoard, deleteBoard } from "../api/boards";
import { getColumns, createColumn, updateColumn, deleteColumn } from "../api/columns";
import { getTasks } from "../api/tasks";
import { searchUsers } from "../api/users";
import "./Board.css";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function Board() {
  const columnsRef = useRef(null);
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [memberQuery, setMemberQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [memberError, setMemberError] = useState(null);

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [columnError, setColumnError] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [boardActionError, setBoardActionError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBoardData() {
      if (!boardId) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [boardData, columnsData, tasksData, membersData, userData] =
          await Promise.all([
            getBoard(boardId),
            getColumns(boardId),
            getTasks(boardId),
            getBoardMembers(boardId),
            getCurrentUser(),
          ]);

        if (isMounted) {
          setBoard(boardData);
          setColumns(columnsData || []);
          setTasks(tasksData || []);
          setMembers(membersData || []);
          setCurrentUser(userData);
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
  }, [boardId]);

  async function reloadTasks() {
    if (!boardId) return;

    try {
      const tasksData = await getTasks(boardId);
      setTasks(tasksData || []);
    } catch (err) {
      setError(err.message || "Failed to refresh tasks.");
    }
  }

  async function refreshMembers() {
    try {
      const membersData = await getBoardMembers(boardId);
      setMembers(membersData || []);
    } catch (err) {
      setMemberError(err.message || "Failed to refresh members.");
    }
  }

  async function handleMemberSearch(e) {
    e.preventDefault();
    if (!memberQuery.trim()) return;

    setIsSearching(true);
    setMemberError(null);

    try {
      const results = await searchUsers(memberQuery.trim());
      setSearchResults(results || []);
    } catch (err) {
      setMemberError(err.message || "Search failed.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleAddMember(userId) {
    try {
      await addBoardMember(boardId, { userId });
      setMemberQuery("");
      setSearchResults([]);
      await refreshMembers();
    } catch (err) {
      setMemberError(err.message || "Failed to add member.");
    }
  }

  async function handleRemoveMember(userId) {
    if (!window.confirm("Remove this member from the board?")) return;

    try {
      await removeBoardMember(boardId, userId);
      await refreshMembers();
    } catch (err) {
      setMemberError(err.message || "Failed to remove member.");
    }
  }

  async function handleAddColumn(e) {
    e.preventDefault();
    if (!newColumnTitle.trim() || !boardId) return;

    setColumnError(null);

    try {
      const column = await createColumn(boardId, {
        title: newColumnTitle.trim(),
      });
      setColumns((prev) => [...prev, column]);
      setNewColumnTitle("");
    } catch (err) {
      setColumnError(err.message || "Failed to add column.");
    }
  }

  async function handleRenameBoard(e) {
    e.preventDefault();
    const name = nameDraft.trim();
    if (!name) return;

    setBoardActionError(null);
    try {
      const updated = await updateBoard(boardId, { name });
      setBoard(updated);
      setIsEditingName(false);
    } catch (err) {
      setBoardActionError(err.message || "Failed to rename board.");
    }
  }

  async function handleDeleteBoard() {
    if (!board) return;

    if (
      !window.confirm(
        `Delete board "${board.name}" and all its columns and tasks permanently? This cannot be undone.`
      )
    ) {
      return;
    }

    setBoardActionError(null);
    try {
      await deleteBoard(boardId);
      navigate("/");
    } catch (err) {
      setBoardActionError(err.message || "Failed to delete board.");
    }
  }

  async function handleRenameColumn(col) {
    const colId = col._id || col.id;
    const title = window.prompt("Column title", col.title);
    if (title === null) return;
    const trimmed = title.trim();
    if (!trimmed || trimmed === col.title) return;

    setColumnError(null);
    try {
      const updated = await updateColumn(boardId, colId, { title: trimmed });
      setColumns((prev) =>
        prev.map((c) =>
          (c._id || c.id) === colId ? { ...c, title: updated.title } : c
        )
      );
    } catch (err) {
      setColumnError(err.message || "Failed to rename column.");
    }
  }

  async function handleDeleteColumn(col) {
    const colId = col._id || col.id;
    const count = tasks.filter((t) => {
      const taskColumnId =
        t.columnId?._id || t.columnId?.id || t.columnId;
      return String(taskColumnId) === String(colId);
    }).length;

    const message =
      count > 0
        ? `Delete column "${col.title}" and its ${count} task${count === 1 ? "" : "s"} permanently?`
        : `Delete column "${col.title}"?`;

    if (!window.confirm(message)) return;

    setColumnError(null);
    try {
      await deleteColumn(boardId, colId);
      setColumns((prev) => prev.filter((c) => (c._id || c.id) !== colId));
      await reloadTasks();
    } catch (err) {
      setColumnError(err.message || "Failed to delete column.");
    }
  }

  function openAddTask(columnId) {
    setEditingTask(null);
    setActiveColumnId(columnId);
    setIsModalOpen(true);
  }

  function openEditTask(task) {
    setEditingTask(task);
    setActiveColumnId(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
    setActiveColumnId(null);
  }

  const isOwner = Boolean(
    board && currentUser && String(board.ownerId) === String(currentUser.id)
  );

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

  if (!boardId) {
    return (
      <div className="board">
        <p className="board__subtitle">
          No board selected. Pick a board from your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="board">
      <div className="board__header">
        <div className="board__title-group">
          <div className="board__badge"></div>
          <div>
            {isEditingName ? (
              <form className="board__rename" onSubmit={handleRenameBoard}>
                <input
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  autoFocus
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditingName(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <h2 className="board__title">{board?.name || "Project Board"}</h2>
            )}
            <p className="board__subtitle">
              {tasks.length} tasks across {columns.length} stages
            </p>
            {boardActionError && (
              <p className="board__action-error">{boardActionError}</p>
            )}
            {isOwner && (
              <div className="board__header-actions">
                <button
                  type="button"
                  className="board__action-btn"
                  onClick={() => {
                    setNameDraft(board?.name || "");
                    setIsEditingName(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="board__action-btn board__action-btn--danger"
                  onClick={handleDeleteBoard}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <form className="board__add-column" onSubmit={handleAddColumn}>
          <input
            type="text"
            placeholder="Add column"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            required
          />
          <button type="submit" aria-label="Add column">
            +
          </button>
          {columnError && (
            <span className="board__add-column-error">{columnError}</span>
          )}
        </form>
      </div>

      <div className="board__members">
        <button
          type="button"
          className="board__members-toggle"
          onClick={() => setIsMembersOpen((v) => !v)}
        >
          Members ({members.length})
        </button>

        {isMembersOpen && (
          <div className="board__members-panel">
            <div className="board__members-list">
              {members.map((member) => (
                <div className="board__member-chip" key={member.userId}>
                  <span className="board__member-initials">
                    {getInitials(member.name)}
                  </span>
                  <span className="board__member-name">{member.name}</span>
                  <span className="board__member-email">{member.email}</span>
                  {member.role === "owner" && (
                    <span className="board__member-role">owner</span>
                  )}
                  {isOwner && member.role !== "owner" && (
                    <button
                      type="button"
                      className="board__member-remove"
                      onClick={() => handleRemoveMember(member.userId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isOwner && (
              <form className="board__member-add" onSubmit={handleMemberSearch}>
                <input
                  type="text"
                  placeholder="Search users by name or email"
                  value={memberQuery}
                  onChange={(e) => setMemberQuery(e.target.value)}
                />
                <button type="submit" disabled={isSearching}>
                  {isSearching ? "Searching…" : "Search"}
                </button>
              </form>
            )}

            {searchResults.length > 0 && (
              <ul className="board__member-results">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      onClick={() => handleAddMember(result.id)}
                    >
                      {result.name} · {result.email}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {memberError && (
              <p className="board__member-error">{memberError}</p>
            )}
          </div>
        )}
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
              <Column
                column={col}
                tasks={tasks}
                members={members}
                onAddTask={() => openAddTask(colId)}
                onEdit={openEditTask}
                onDeleted={reloadTasks}
                onColumnEdit={handleRenameColumn}
                onColumnDelete={handleDeleteColumn}
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          boardId={boardId}
          columnId={activeColumnId}
          taskToEdit={editingTask}
          members={members}
          columns={columns}
          onClose={closeModal}
          onTaskSaved={reloadTasks}
        />
      )}
    </div>
  );
}