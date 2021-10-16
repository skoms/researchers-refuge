import React from 'react'
import styles from '../Error.module.css';
import { useHistory, useLocation } from 'react-router-dom'
import TypedButton from '../../typedButton/TypedButton';
import { getIconUrl } from '../../../Icons';

const Forbidden = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const goBack = () => {
    history.push(from);
  }
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={getIconUrl('no-entry', localStorage.getItem('darkmode') === 'true', {
          size: 180, colors: {dark: '38B6FF', light: '1A3861'}
        })} 
        alt='stop-sign'
      />
      <h1 className={styles.status}>403</h1>
      <p className={styles.message}>You do not have the required clearance level to enter.</p>
      <TypedButton
        buttontype='secondary'
        onClick={goBack}
        content='Go Back'
        className={styles.secondaryButton}
      />
    </div>
  )
}

export default Forbidden
