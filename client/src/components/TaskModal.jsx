import { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/tasks";
import "./TaskModal.css";

export default function TaskModal({ isOpen = true, onClose, taskToEdit, columnId, boardId, members = [], columns = [], onTaskSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
    dueDate: "",
    assigneeId: "",
    columnId: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "normal",
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "",
        assigneeId: taskToEdit.assigneeId || "",
        columnId: taskToEdit.columnId?._id || taskToEdit.columnId?.id || taskToEdit.columnId || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "normal",
        dueDate: "",
        assigneeId: "",
        columnId: columnId || ""
      });
    }
    setError(null);
  }, [taskToEdit, isOpen, columnId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        assigneeId: formData.assigneeId || null,
        columnId: formData.columnId || undefined
      };

      if (taskToEdit) {
        // PATCH /api/tasks/:id
        await updateTask(taskToEdit._id || taskToEdit.id, payload);
      } else {
        // POST /api/tasks
        await createTask({
          ...payload,
          boardId
        });
      }

      setLoading(false);
      if (onTaskSaved) onTaskSaved();
      if (onClose) onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to save task. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{taskToEdit ? "Edit Task" : "New Task"}</h3>

        {error && <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low Priority</option>
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <select name="assigneeId" value={formData.assigneeId} onChange={handleChange}>
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.userId} value={member.userId}>
                {member.name} · {member.email}
              </option>
            ))}
          </select>

          <select name="columnId" value={formData.columnId} onChange={handleChange}>
            {(columns || []).map((col) => (
              <option key={col._id || col.id} value={col._id || col.id}>
                {col.title}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
