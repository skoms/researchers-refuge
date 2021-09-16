import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Forbidden = () => {
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
      <h1 className="status-code">403</h1>
      <p className="error-message">You do not have the required clearance level to enter.</p>
      <button className='button-secondary' onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Forbidden
