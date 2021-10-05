import { useState, useEffect } from "react"

const ActionButtons = ({ id, isEntry, setManagerProps, data, type }) => {
  const [didLoad, setDidLoad] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(false);

  //! ITS PRETTY OBVIOUS ...
  const viewData = () => {
    setManagerProps({ 
      isActive: true,
      source: 'view',
      type: type,
      data: data,
      isEntry: true
    })
  }
  const editData = () => {
    setManagerProps({ 
      isActive: true,
      source: 'edit',
      type: type,
      data: data,
      isEntry: true
    })
  }
  const toggleDropdownMenu = () => {

  }
  const blockData = () => {

  }
  const deleteData = () => {

  }
  const createNewData = () => {
    setManagerProps( prevProps => (
      { 
        isActive: true,
        source: 'create',
        type: type,
        data: data,
        isEntry: false
       }
    ))
  }

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', e => {
        const isDropdownButton = e.target.matches('[data-more-menu-button]');
        const dropdown = document.querySelector('[data-more-menu]');
        const dropdownBtn = document.querySelector('[data-more-menu-button]');
  
        if (!isDropdownButton) {
          setMenuIsActive(false);

          dropdownBtn.classList.contains('active') 
            && dropdownBtn.classList.remove('active');
          return
        } else {
          setMenuIsActive(dropdown.classList.contains('active') ? false : true);
          e.target.classList.toggle('active');
        }
      });
    }
    if (!didLoad) {
      addDropdownEventHandler();
      setDidLoad(true);
    }
  }, [didLoad, menuIsActive]);

  return isEntry ? (
    <div className="action-buttons">
      <button onClick={viewData}>
        <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
      </button>
      <button onClick={editData}>
        <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
      </button>
      <div className={`action-dropdown ${ menuIsActive ? 'active' : ''}`} data-more-menu >
        <button onClick={toggleDropdownMenu} data-more-menu-button className='action-button '>
          <img data-more-menu-button src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
        </button>
        <div className="dropdown-menu">
          <button onClick={blockData}>
            Block
          </button>
          <button onClick={deleteData}>
            Delete
          </button>
        </div>
      </div>
      
    </div>
  ) : (
    <div className="action-buttons">
      <button onClick={createNewData}>
        <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
      </button>
    </div>
  );
}

export default ActionButtons
