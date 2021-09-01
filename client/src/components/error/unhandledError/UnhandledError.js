import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

//TODO - Hook up the 'contact us' link

const UnhandledError = props => {
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
      <h1 className="status-code">{props.statusCode || 500}</h1>
      <p className="error-message">{props.errorMessage || 'Something went wrong, please try and refresh the page, if the issue persists, please'} <Link to='/'>contact us</Link></p>
      { props.errorStack && <p className="error-stack">{props.errorStack}</p> }
      <button className='button-secondary' onClick={goBack}>Go Back</button>
    </div>
  )
}

export default UnhandledError
