import React from 'react'
import styles from '../Error.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom'
import TypedButton from '../../typedButton/TypedButton';
import { getIconUrl } from '../../../Icons';

//TODO - Hook up report bug form

const UnhandledError = props => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const goBack = () => {
    history.push(from);
  }
  return (
    <div className={styles.container}>
      <img className={styles.img} src={getIconUrl('no-entry', localStorage.getItem('darkmode') === 'true', {size: 180, colors: {dark: '38B6FF', light: '1A3861'}})} alt='stop-sign' />
      <h1 className={styles.status}>{props.statusCode || 500}</h1>
      <p className={styles.message}>{props.errorMessage || 'Something went wrong, please try and refresh the page, if the issue persists, please'} <Link to='/'>issue a bug report</Link></p>
      { props.errorStack && <p className={styles.stack}>{props.errorStack}</p> }
      <TypedButton
        buttontype='secondary'
        onClick={goBack}
        content='Go Back'
        className={styles.secondaryButton}
      />
    </div>
  )
}

export default UnhandledError
