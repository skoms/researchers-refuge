import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import ConfirmationPopup from "../../../confirmationPopup.js/ConfirmationPopup";
import { selectDarkModeOn } from "../../../darkmodeButton/darkModeButtonSlice";

const ActionButtons = ({ id, isEntry, statusFilter, setManagerProps, data, type }) => {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const blockConfirmation = useRef(null);
  const deleteConfirmation = useRef(null);
  const dropdown = useRef(null);

  const darkModeOn = useSelector(selectDarkModeOn);

  //! ITS PRETTY OBVIOUS ...
  const getButtonColor = () => {
    if (!darkModeOn) return '15458A';
    if (!statusFilter) return '64B5F7';
    switch (statusFilter) {
      case 'open':
        return '64B5F7';
      case 'resolved':
        return '1FAD0D';
      case 'rejected':
        return 'FF2323';
    
      default:
        return;
    }
  }

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
            <img src={`https://img.icons8.com/material-outlined/16/${getButtonColor()}/visible--v1.png`} alt='view button' />
          </button>
          <button onClick={editData}>
            <img src={`https://img.icons8.com/material-outlined/16/${getButtonColor()}/pencil--v1.png`} alt='edit button'/>
          </button>
          <div className={`action-dropdown ${ menuIsActive ? 'active' : ''}`} ref={dropdown} >
            <button onClick={toggleDropdownMenu} className='action-button '>
              <img data-more-menu-button src={`https://img.icons8.com/ios-filled/16/${getButtonColor()}/menu-2.png`} alt='more button'/>
            </button>
            <div className="dropdown-menu">
              
              <button onClick={confirmBlock}>
                <img src={`https://img.icons8.com/material-outlined/16/${getButtonColor()}/cancel-2.png`} alt='block button' style={{margin: 0}}/>
              </button>
              
              <button onClick={confirmDelete}>
                <img src={`https://img.icons8.com/external-kiranshastry-solid-kiranshastry/16/${getButtonColor()}/external-delete-multimedia-kiranshastry-solid-kiranshastry.png`} alt='delete button' style={{margin: 0}}/>
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
        <img src={`https://img.icons8.com/android/16/${getButtonColor()}/plus.png`} alt='create button'/>
      </button>
    </div>
  );
}

export default ActionButtons
