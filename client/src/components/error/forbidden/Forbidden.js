import React from 'react'

const Forbidden = () => {
  return (
    <div className='error-div'>
      { localStorage.getItem('darkmode') === 'true' 
      ?
        <img src="https://img.icons8.com/ios/90/ffffff/no-entry.png" alt='stop-sign' />
      :
        <img src="https://img.icons8.com/ios/90/000000/no-entry.png" alt='stop-sign' />
      }
      <h1 className="status-code">403</h1>
      <p className="error-message">You do not have the required clearance level to enter.</p>
      <p className="error-stack"> </p>
    </div>
  )
}

export default Forbidden
