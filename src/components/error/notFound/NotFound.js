import React from 'react'
import styles from '../Error.module.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import TypedButton from '../../typedButton/TypedButton'
import { getIconUrl } from '../../../Icons'

const NotFound = () => {
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const goBack = () => {
    history.push(from)
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={getIconUrl(
          'no-entry',
          localStorage.getItem('darkmode') === 'true',
          {
            size: 180,
            colors: { dark: '38B6FF', light: '1A3861' },
          },
        )}
        alt="stop-sign"
      />
      <h1 className={styles.status}>404</h1>
      <p className={styles.message}>
        We could not find the page you are looking for. Try again, or return to
        the <Link to={'/'}>homepage</Link>.
      </p>
      <TypedButton
        buttontype="secondary"
        onClick={goBack}
        content="Go Back"
        className={styles.secondaryButton}
      />
    </div>
  )
}

export default NotFound
