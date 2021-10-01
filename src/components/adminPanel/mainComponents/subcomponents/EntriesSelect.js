const EntriesSelect = ({ limitChangeHandler }) => {
  return (
    <div className="show-entries">
      Show 
      <select name="entries" id="entries-select" onChange={limitChangeHandler}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      entries
    </div>
  )
}

export default EntriesSelect
