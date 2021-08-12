import React from 'react'

const UnhandledError = props => {
  return (
    <div className='error-div'>
      { localStorage.getItem('darkmode') === 'true' 
      ?
        <img src="https://img.icons8.com/ios/90/ffffff/no-entry.png" alt='stop-sign' />
      :
        <img src="https://img.icons8.com/ios/90/000000/no-entry.png" alt='stop-sign' />
      }
      <h1 className="status-code">{props.statusCode || 500}</h1>
      <p className="error-message">{props.errorMessage || 'Something went wrong, please try and refresh the page, if the issue persists, please'} <a href="/">let us know</a></p>
      <p className="error-stack">{props.errorStack || ''}</p>
    </div>
  )
}

export default UnhandledError
