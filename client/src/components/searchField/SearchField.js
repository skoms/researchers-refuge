import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { 
  updateSearchTerm,
  selectSearchTerm
} from './searchFieldSlice';

const SearchField = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const submit = () => {
    history.push({ pathname: `/search/${searchTerm}`, state: { from: location.pathname }});
  }

  return (
    <form onSubmit={submit}>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
        placeholder="Search for articles or people"
      />
    </form>
  )
}


export default SearchField
