import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import './App.css'

// STAGE 3: tasks are now saved to localStorage, so refreshing the page
// doesn't lose them.
const defaultTasks = [
  { id: 1, text: 'Finish React assignment', category: 'Work', completed: false },
  { id: 2, text: 'Buy groceries', category: 'Personal', completed: false },
  { id: 3, text: 'Submit visa form', category: 'Urgent', completed: true },
]

function App() {
  // Lazy initializer: this function runs ONCE, the very first time the app
  // loads, to check if there's saved data in localStorage already.
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : defaultTasks
  })
  const [filter, setFilter] = useState('All') // 'All' | 'Active' | 'Completed'

  // useEffect runs every time `tasks` changes, and saves the new value
  // to localStorage (as a string, since localStorage only stores text).
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // --- Handlers that update state ---
  function addTask(text, category) {
    const newTask = {
      id: Date.now(), // simple unique id
      text,
      category,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function editTask(id, newText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  // --- Derived values (calculated from state, not stored separately) ---
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true // 'All'
  })

  const remainingCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Task Manager</h1>
        <p className="task-count">
          {remainingCount} remaining · {completedCount} completed
        </p>
      </header>

      <TaskForm onAddTask={addTask} />
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
        onEditTask={editTask}
      />
    </div>
  )
}

export default App
