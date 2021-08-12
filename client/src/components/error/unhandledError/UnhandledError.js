import React from 'react'

//TODO - Hook up the 'contact us' link

const UnhandledError = props => {
  return (
    <div className='error-div'>
      { localStorage.getItem('darkmode') === 'true' 
      ?
        <img src="https://img.icons8.com/ios/180/38B6FF/no-entry.png" alt='stop-sign' />
      :
        <img src="https://img.icons8.com/ios/180/000000/no-entry.png" alt='stop-sign' />
      }
      <h1 className="status-code">{props.statusCode || 500}</h1>
      <p className="error-message">{props.errorMessage || 'Something went wrong, please try and refresh the page, if the issue persists, please'} <a href="/">contact us</a></p>
      { props.errorStack && <p className="error-stack">{props.errorStack}</p> }
      
    </div>
  )
}

export default UnhandledError
