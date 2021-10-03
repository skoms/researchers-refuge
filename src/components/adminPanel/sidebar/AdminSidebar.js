import React, { useEffect, useState } from 'react'

const AdminSidebar = ({select}) => {
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', e => {
        const isDropdownButton = e.target.matches('[data-management-menu-button]');
        const dropdown = document.querySelector('[data-management-menu]');
  
        if (!isDropdownButton) {
          document.querySelector('[data-management-menu].active') && 
          document.querySelector('[data-management-menu].active').classList.remove('active');

          document.querySelector('[data-management-menu-button].active') && 
          document.querySelector('[data-management-menu-button].active').classList.remove('active');
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
  )
}

export default AdminSidebar
