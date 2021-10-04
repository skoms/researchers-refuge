import React from 'react'

const StatusFilter = ({ setStatusFilter }) => {
  const handleStatusFilter = e => {
    const isFilterButton = e.target.matches('[data-status-filter-button]');
    if (!isFilterButton) return;
    if (isFilterButton) {
      document.querySelector('[data-status-filter-button].selected').classList.remove('selected');
      e.target.classList.add('selected');
      setStatusFilter(e.target.innerHTML.toLowerCase());
    }
  }
  return (
    <div className="status-filter" onClick={handleStatusFilter}>
      <button data-status-filter-button className='open-button selected'>Open</button>
      <button data-status-filter-button className='resolved-button'>Resolved</button>
      <button data-status-filter-button className='rejected-button'>Rejected</button>
    </div>
  )
}

export default StatusFilter
