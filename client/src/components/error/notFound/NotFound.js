import React from 'react'

const NotFound = () => {
  return (
    <div className='error-div'>
      { localStorage.getItem('darkmode') === 'true' 
      ?
        <img src="https://img.icons8.com/ios/90/ffffff/no-entry.png" alt='stop-sign' />
      :
        <img src="https://img.icons8.com/ios/90/000000/no-entry.png" alt='stop-sign' />
      }
      <h1 className="status-code">404</h1>
      <p className="error-message">We could not find the page you are looking for. Try again, or return to the <a href="/">homepage</a>.</p>
      <p className="error-stack"> </p>
    </div>
  )
}

export default NotFound
