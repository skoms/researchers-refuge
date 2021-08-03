import React from 'react'

const SearchField = () => {
  return (
    <div>
      <input
        id="search"
        type="text"
        value='' //TODO - Set to searchTerm state
        // onChange={} //TODO - Set up onChange eventhandler
        placeholder="Search for articles or people"
      />
    </div>
  )
}

export default SearchField
