import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/tasks";
import "./TaskModal.css";

export default function TaskModal({ isOpen = true, onClose, taskToEdit, columnId, onTaskSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
    dueDate: "",
    assigneeId: ""
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
        assigneeId: taskToEdit.assigneeId || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "normal",
        dueDate: "",
        assigneeId: ""
      });
    }
    setError(null);
  }, [taskToEdit, isOpen]);

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
        ...(formData.assigneeId && { assigneeId: formData.assigneeId })
      };

      if (taskToEdit) {
        // PATCH /api/tasks/:id
        await updateTask(taskToEdit._id || taskToEdit.id, payload);
      } else {
        // POST /api/tasks
        await createTask({
          ...payload,
          columnId: columnId
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
