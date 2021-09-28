import React, { useEffect, useState } from 'react'

const AdminPanel = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [selection, setSelection] = useState('Statistics');

  

  const select = e => {
    setSelection(e.target.innerHTML);
  }

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', e => {
        const isDropdownButton = e.target.matches('[data-management-menu-button]');
        const dropdown = document.querySelector('[data-management-menu]');
  
        if (!isDropdownButton) {
          const activeDropdown = document.querySelector('[data-management-menu].active');
          const activeDropdownButton = document.querySelector('[data-management-menu-button].active');

          activeDropdown && activeDropdown.classList.remove('active');
          activeDropdownButton && activeDropdownButton.classList.remove('active');
          return
        }
        if (isDropdownButton) {
          dropdown.classList.toggle('active');
          e.target.classList.toggle('active');
        }
      });
    }
    if (!didLoad) {
      addDropdownEventHandler();
      setDidLoad(true);
    }
  }, [didLoad]);

  return (
    <div className='admin-panel-div'>
      <div className="panel-sidebar">
        <h2 className='title'>Admin Panel</h2>
        <button className='sidebar-button' onClick={select}>Statistics</button>
        <div className="sidebar-dropdown" data-management-menu >
          <button className='sidebar-button' data-management-menu-button>Access Management</button>
          <div className="dropdown-menu">
            <button className='sidebar-button' onClick={select}>User Management</button> <hr />
            <button className='sidebar-button' onClick={select}>Article Management</button> <hr />
            <button className='sidebar-button' onClick={select}>Topic Management</button> <hr />
            <button className='sidebar-button' onClick={select}>Category Management</button>
          </div>
        </div>
        <button className='sidebar-button' onClick={select}>Report Center</button>
      </div>
      <div className="panel-main">

      </div>
    </div>
  )
}

export default AdminPanel
