import React from 'react'

const Forbidden = () => {
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
    </div>
  )
}

export default Forbidden
