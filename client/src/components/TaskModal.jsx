import "./TaskModal.css";

export default function TaskModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>New Task</h3>

        <input type="text" placeholder="Title" />

        <textarea placeholder="Description" />

        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="button">
          Save
        </button>
      </div>
    </div>
  );
}