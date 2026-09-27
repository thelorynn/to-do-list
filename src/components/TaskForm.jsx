import { useState } from 'react'

// TaskForm is a "controlled component": the input's value is tied to
// React state (useState), not just to whatever the browser holds.
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('Personal')

  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading (default form behavior)

    const trimmed = text.trim()
    if (trimmed === '') return // ignore empty submissions

    onAddTask(trimmed, category) // call the function passed down from App
    setText('') // clear the input after adding
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        className="task-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button type="submit" className="add-btn">Add Task</button>
    </form>
  )
}

export default TaskForm
