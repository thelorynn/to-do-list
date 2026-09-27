// FilterBar shows the three filter buttons. It doesn't own the filter
// state itself -- it receives the current value and a setter function
// from App, and just calls that setter when a button is clicked.
const FILTERS = ['All', 'Active', 'Completed']

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((filterName) => (
        <button
          key={filterName}
          className={`filter-btn ${currentFilter === filterName ? 'active' : ''}`}
          onClick={() => onFilterChange(filterName)}
        >
          {filterName}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
