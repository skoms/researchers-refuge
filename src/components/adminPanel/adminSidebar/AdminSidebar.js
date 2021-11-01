import React, { useEffect, useRef } from 'react'
import styles from './AdminSideBar.module.css'
import useToggle from '../../../customHooks/useToggle'

const AdminSidebar = ({ select }) => {
  const [loading, toggleLoading] = useToggle(true)
  const [menuIsActive, toggleMenuIsActive] = useToggle(false)

  const menuRef = useRef()
  const menuButtonRef = useRef()

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', (e) => {
        const isDropdownButton = e.target.matches(
          '[data-management-menu-button]',
        )

        if (menuButtonRef.current && menuRef.current) {
          if (!isDropdownButton) {
            toggleMenuIsActive(false)

            menuButtonRef.current.classList.contains('active') &&
              menuButtonRef.current.classList.remove('active')
            return
          } else {
            toggleMenuIsActive(
              menuRef.current.classList.contains('active') ? false : true,
            )
            e.target.classList.toggle('active')
          }
        }
      })
    }
    if (loading && menuRef.current && menuButtonRef.current) {
      addDropdownEventHandler()
      toggleLoading(false)
    }
  }, [menuIsActive, toggleMenuIsActive, loading, toggleLoading])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Panel</h2>
      <button className={styles.button} onClick={select}>
        Statistics
      </button>
      <div
        data-testid="dropdown"
        className={`${styles.dropdown} ${menuIsActive ? 'active' : ''}`}
        ref={menuRef}
      >
        <button
          className={styles.button}
          ref={menuButtonRef}
          data-management-menu-button
        >
          Access Management
        </button>
        <div className={styles.dropdownMenu}>
          <button className={styles.button} onClick={select}>
            User Management
          </button>
          <hr />
          <button className={styles.button} onClick={select}>
            Article Management
          </button>
          <hr />
          <button className={styles.button} onClick={select}>
            Topic Management
          </button>
          <hr />
          <button className={styles.button} onClick={select}>
            Category Management
          </button>
        </div>
      </div>
      <button className={styles.button} onClick={select}>
        Report Center
      </button>
    </div>
  )
}

export default AdminSidebar
