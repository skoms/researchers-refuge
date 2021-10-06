import { useState, useEffect, useRef } from "react"
import ConfirmationPopup from "../../../confirmationPopup.js/ConfirmationPopup";

const ActionButtons = ({ id, isEntry, setManagerProps, data, type }) => {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const blockConfirmation = useRef(null);
  const deleteConfirmation = useRef(null);

  const dropdown = useRef(null);

  //! ITS PRETTY OBVIOUS ...
  const hideConfirmations = () => {
    if (blockConfirmation.current && deleteConfirmation.current) {
      !blockConfirmation.current.classList.contains('invisible') && 
        blockConfirmation.current.classList.add('invisible');
      !deleteConfirmation.current.classList.contains('invisible') && 
        deleteConfirmation.current.classList.add('invisible');
    }
  }

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
    setMenuIsActive(!menuIsActive)
    hideConfirmations();
  };

  const confirmBlock = () => {
    if (blockConfirmation.current) {
      const { firstElementChild, classList } = blockConfirmation.current;
      let clientRect = firstElementChild.getBoundingClientRect();
      firstElementChild.style.top = (clientRect.top) * -1 + "px"; 
      firstElementChild.style.left = (clientRect.left) * -1 + "px"; 
      classList.remove('invisible');
    }
  }
  const blockData = () => {

  }

  const confirmDelete = () => {
    if (deleteConfirmation.current) {
      const { firstElementChild, classList } = deleteConfirmation.current;
      let clientRect = firstElementChild.getBoundingClientRect();
      firstElementChild.style.top = (clientRect.top) * -1 + "px"; 
      firstElementChild.style.left = (clientRect.left) * -1 + "px"; 
      classList.remove('invisible');
    }
  }
  const deleteData = () => {

  }

  const createNewData = () => {
    setManagerProps((
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
    const pageClickEvent = e => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setMenuIsActive(!menuIsActive);
        hideConfirmations();
      }
    }
    menuIsActive && window.addEventListener('click', pageClickEvent);
    return () => window.removeEventListener('click', pageClickEvent);
  }, [menuIsActive])

  return isEntry ? (
    <>
      <div className="action-buttons">
          <button onClick={viewData}>
            <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
          </button>
          <button onClick={editData}>
            <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
          </button>
          <div className={`action-dropdown ${ menuIsActive ? 'active' : ''}`} ref={dropdown} >
            <button onClick={toggleDropdownMenu} className='action-button '>
              <img data-more-menu-button src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
            </button>
            <div className="dropdown-menu">
              
              <button onClick={confirmBlock}>
                Block
              </button>
              
              <button onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <ConfirmationPopup 
          action='block'
          target='entry'
          confirm={blockData}
          containerRef={blockConfirmation}
        />
        <ConfirmationPopup 
          action='delete'
          target='entry'
          confirm={deleteData}
          containerRef={deleteConfirmation}
        />
    </>
    
  ) : (
    <div className="action-buttons">
      <button onClick={createNewData}>
        <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
      </button>
    </div>
  );
}

export default ActionButtons
