import React, { useRef } from 'react'
import styles from './StatusFilter.module.css';

const StatusFilter = ({ setStatusFilter }) => {
  const selectedRef = useRef();

  const handleStatusFilter = e => {
    const isFilterButton = e.target.matches('[data-status-filter-button]');
    if (!isFilterButton) return;
    if (isFilterButton) {
      selectedRef.current.classList.remove('selected');
      e.target.classList.add('selected');
      selectedRef.current = e.target;
      setStatusFilter(e.target.innerHTML.toLowerCase());
    }
  }
  return (
    <div className={styles.container} onClick={handleStatusFilter}>
      <button data-status-filter-button ref={selectedRef} className={`${styles.openButton} selected`}>Open</button>
      <button data-status-filter-button className={styles.resolvedButton}>Resolved</button>
      <button data-status-filter-button className={styles.rejectedButton}>Rejected</button>
    </div>
  )
}

export default StatusFilter
