import React from 'react'
import styles from './EntriesShown.module.css'

const EntriesShown = ({ data }) => {
  return (
    <p className={styles.container}>
      {`Showing ${data.rangeStart} to ${data.rangeEnd} of ${data.total} entries`}
    </p>
  )
}

export default EntriesShown
