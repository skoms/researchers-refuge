import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateSearchTerm,
  selectSearchTerm
} from './searchFieldSlice';

const SearchField = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
        placeholder="Search for articles or people"
      />
    </div>
  )
}


export default SearchField
