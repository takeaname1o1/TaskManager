export default function TaskCard({ task, onToggle, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "#ff4d4f";
      case "Medium": return "#faad14";
      default: return "#52c41a";
    }
  };

  return (
    <div className={`task-card ${task.status === "Completed" ? "is-completed" : ""}`}>
      {/* Left Column: Checkbox */}
      <div className="task-check-wrapper">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.status === "Completed"}
          onChange={() => onToggle(task)}
        />
      </div>

      {/* Middle Column: Content */}
      <div className="task-body">
        <h4 className="task-title">
          {task.title}
        </h4>
        {task.description && <p className="task-desc">{task.description}</p>}
        
        <div className="task-meta">
          <span 
            className="priority-badge" 
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="due-date">
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className="task-actions">
        <button className="delete-btn" onClick={() => onDelete(task._id)} title="Delete Task">
          🗑️
        </button>
      </div>
    </div>
  );
}