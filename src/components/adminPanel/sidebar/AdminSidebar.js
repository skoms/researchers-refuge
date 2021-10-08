import React, { useEffect } from 'react'
import useToggle from '../../../customHooks/useToggle';

const AdminSidebar = ({select}) => {
  const [loading, toggleLoading] = useToggle(true);
  const [menuIsActive, toggleMenuIsActive] = useToggle(false);

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', e => {
        const isDropdownButton = e.target.matches('[data-management-menu-button]');
        const dropdown = document.querySelector('[data-management-menu]');
        const dropdownBtn = document.querySelector('[data-management-menu-button]');
  
        if (!isDropdownButton) {
          toggleMenuIsActive(false);

          dropdownBtn.classList.contains('active') 
            && dropdownBtn.classList.remove('active');
          return
        } else {
          toggleMenuIsActive(dropdown.classList.contains('active') ? false : true);
          e.target.classList.toggle('active');
        }
      });
    }
    if (loading) {
      addDropdownEventHandler();
      toggleLoading(false);
    }
  }, [ menuIsActive, toggleMenuIsActive, loading, toggleLoading]);

  return (
    <div className="panel-sidebar">
      <h2 className='title'>Admin Panel</h2>
      <button className='sidebar-button' onClick={select}>Statistics</button>
      <div className={`sidebar-dropdown ${ menuIsActive ? 'active' : ''}`} data-management-menu >
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
