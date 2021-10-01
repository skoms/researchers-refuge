const TableSearch = ({search, searchQuery, clearSearch, clearTermIfEmpty}) => {
  return (
    <div className="table-search">
      <form onSubmit={search} className='table-search-form'>
        { searchQuery !== '' && <button className="clear-search" onClick={clearSearch}>
          <img src="https://img.icons8.com/fluency-systems-filled/18/64B5F7/xbox-x.png" alt='clear search button'/>
        </button>}
        <input type="text" className='table-search-field' data-table-search-field placeholder='Search...' onChange={clearTermIfEmpty}/>
        <button type='submit' className="search-button">
          <img src="https://img.icons8.com/material-outlined/18/64B5F7/search--v1.png" alt='search button'/>
        </button>
      </form>
    </div>
  )
}

export default TableSearch
