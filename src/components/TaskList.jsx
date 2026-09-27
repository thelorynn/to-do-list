import TaskItem from './TaskItem'

// TaskList receives an array of tasks as a prop, then loops through it
// with .map() to render one TaskItem per task. Each item needs a unique "key".
function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above! 🎉</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
