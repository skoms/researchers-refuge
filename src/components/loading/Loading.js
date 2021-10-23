import React from 'react'
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container} data-testid='loading-component'>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  )
}

export default Loading
