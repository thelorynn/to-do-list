import { useState } from 'react'

// TaskItem shows ONE task. It receives the task data AND functions
// (onToggle, onDelete, onEdit) as props from TaskList. This is how a child
// component can trigger a change that actually lives in App's state
// ("lifting state up").
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)

  function handleSave() {
    const trimmed = draftText.trim()
    if (trimmed !== '') {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={draftText}
          autoFocus
          onChange={(e) => setDraftText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
          {task.text}
        </span>
      )}

      <span className={`category-tag ${task.category.toLowerCase()}`}>
        {task.category}
      </span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  )
}

export default TaskItem
