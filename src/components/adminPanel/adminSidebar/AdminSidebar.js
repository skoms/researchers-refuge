import React, { useEffect } from 'react'
import styles from './AdminSideBar.module.css';
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
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Panel</h2>
      <button className={styles.button} onClick={select}>Statistics</button>
      <div className={`${styles.dropdown} ${ menuIsActive ? 'active' : ''}`} data-management-menu >
        <button className={styles.button} data-management-menu-button>Access Management</button>
        <div className={styles.dropdownMenu}>
          <button className={styles.button} onClick={select}>User Management</button> <hr />
          <button className={styles.button} onClick={select}>Article Management</button> <hr />
          <button className={styles.button} onClick={select}>Topic Management</button> <hr />
          <button className={styles.button} onClick={select}>Category Management</button> 
        </div>
      </div>
      <button className={styles.button} onClick={select}>Report Center</button>
    </div>
  )
}

export default AdminSidebar
