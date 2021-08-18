import React, { useState } from 'react'

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const change = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={change}
        placeholder="Search for articles or people"
      />
    </div>
  )
}

export default SearchField
