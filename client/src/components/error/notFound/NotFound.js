import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const goBack = () => {
    history.push(from);
  }
  return (
    <div className='error-div'>
      { localStorage.getItem('darkmode') === 'true' 
      ?
        <img src="https://img.icons8.com/ios/180/38B6FF/no-entry.png" alt='stop-sign' />
      :
        <img src="https://img.icons8.com/ios/180/1a3861/no-entry.png" alt='stop-sign' />
      }
      <h1 className="status-code">404</h1>
      <p className="error-message">We could not find the page you are looking for. Try again, or return to the <Link to={from}>homepage</Link>.</p>
      <button className='button-secondary' onClick={goBack}>Go Back</button>
    </div>
  )
}

export default NotFound
