import { useEffect, useRef } from "react"
import styles from './ActionButtons.module.css';
import { useSelector, useDispatch } from "react-redux";
import useToggle from "../../../../customHooks/useToggle";
import ConfirmationPopup from "../../../confirmationPopup.js/ConfirmationPopup";
import { selectDarkModeOn } from "../../../darkmodeButton/darkModeButtonSlice";
import { selectAuthenticatedUser } from "../../../user/userAccManage/userAccSlice";
import { blockEntryAdmin, deleteEntryAdmin, markReportAsAdmin } from "../../adminPanelSlice";

const ActionButtons = ({ id, isEntry, statusFilter, setManagerProps, data, type }) => {
  const dispatch = useDispatch();
  const [menuIsActive, toggleMenuIsActive] = useToggle(false);
  const blockConfirmation = useRef(null);
  const deleteConfirmation = useRef(null);
  const dropdown = useRef(null);

  const darkModeOn = useSelector(selectDarkModeOn);
  const user = useSelector(selectAuthenticatedUser);

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

  // cleanup func for confirm popups
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
    toggleMenuIsActive();
    hideConfirmations(); 
  };

  // Positions blur to start at x: 0 y: 0, and then display
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
    dispatch(blockEntryAdmin({ user, type, id }));
  }

  // Positions blur to start at x: 0 y: 0, and then display
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
    dispatch(deleteEntryAdmin({ user, type, id }));
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

  const markAs = e => {
    const status = e.currentTarget.getAttribute("data-status");
    dispatch(markReportAsAdmin({ user, status, id }));
  }

  useEffect(() => {
    const pageClickEvent = e => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        toggleMenuIsActive();
        hideConfirmations();
      }
    }
    menuIsActive && window.addEventListener('click', pageClickEvent);
    return () => window.removeEventListener('click', pageClickEvent);
  }, [menuIsActive, toggleMenuIsActive])

  return isEntry ? (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={viewData}>
          <img className={styles.buttonIcon} src={`https://img.icons8.com/material-outlined/16/${getButtonColor()}/visible--v1.png`} alt='view button' />
          <span className='tooltip'>View</span>
        </button>
        <button className={styles.button} onClick={editData}>
          <img className={styles.buttonIcon} src={`https://img.icons8.com/material-outlined/16/${getButtonColor()}/pencil--v1.png`} alt='edit button'/>
          <span className='tooltip'>Edit</span>
        </button>
        { (type === 'users' || type === 'articles') ?
          <div className={`${styles.dropdown} ${ menuIsActive ? 'active' : ''}`} ref={dropdown} >
            <button className={`${styles.button} ${styles.actionButton}`} onClick={toggleDropdownMenu}>
              <img className={styles.buttonIcon} data-more-menu-button src={`https://img.icons8.com/ios-filled/16/${getButtonColor()}/menu-2.png`} alt='more button'/>
              <span className='tooltip'>More</span>
            </button>
            <div className={styles.dropdownMenu}>
              { (type === 'users' || type === 'articles') && 
                <button className={styles.dropdownMenuButton} onClick={confirmBlock}>
                  <img className={styles.buttonIcon} src={`https://img.icons8.com/material-outlined/16/FF2323/cancel-2.png`} alt='block button' style={{margin: 0}}/>
                  <span className='tooltip'>Block</span>
                </button>
              }
              <button className={styles.dropdownMenuButton} onClick={confirmDelete}>
                <img className={styles.buttonIcon} src={`https://img.icons8.com/external-kiranshastry-solid-kiranshastry/16/FF2323/external-delete-multimedia-kiranshastry-solid-kiranshastry.png`} alt='delete button' style={{margin: 0}}/>
                <span className='tooltip'>Delete</span>
              </button>
            </div>
          </div> 
          :
          <button className={styles.button} onClick={confirmDelete}>
            <img className={styles.buttonIcon} src={`https://img.icons8.com/external-kiranshastry-solid-kiranshastry/16/${getButtonColor()}/external-delete-multimedia-kiranshastry-solid-kiranshastry.png`} alt='delete button'/>
            <span className='tooltip'>Delete</span>
          </button>
        }
        { type === 'reports' && 
            <>
              <button data-status={'open'} onClick={markAs} 
                disabled={`${statusFilter === 'open' ? 'disabled' : ''}`}
                className={`${styles.button} ${statusFilter === 'open' ? 'disabled' : ''}`}
              >
                <img className={styles.buttonIcon} src={`https://img.icons8.com/ios-glyphs/16/${getButtonColor()}/open-parcel.png`} alt='mark as open' />
                <span className='tooltip'>Mark as 'Open'</span>
              </button>
              <button data-status={'resolved'} onClick={markAs} 
                disabled={`${statusFilter === 'resolved' ? 'disabled' : ''}`}
                className={`${styles.button} ${statusFilter === 'resolved' ? 'disabled' : ''}`}
              >
                <img className={styles.buttonIcon} src={`https://img.icons8.com/external-bearicons-glyph-bearicons/16/${getButtonColor()}/external-approved-approved-and-rejected-bearicons-glyph-bearicons-2.png`} alt='mark as resolved' />
                <span className='tooltip'>Mark as 'Resolved'</span>
              </button>
              <button data-status='rejected' onClick={markAs} 
                disabled={`${statusFilter === 'rejected' ? 'disabled' : ''}`}
                className={`${styles.button} ${statusFilter === 'rejected' ? 'disabled' : ''}`}
              >
                <img className={styles.buttonIcon} src={`https://img.icons8.com/external-bearicons-glyph-bearicons/16/${getButtonColor()}/external-reject-approved-and-rejected-bearicons-glyph-bearicons.png`} alt='mark as rejected' />
                <span className='tooltip'>Mark as 'Rejected'</span>
              </button>
            </>
          }
      </div>
      { type !== 'topics' && type !== 'categories' && 
        <ConfirmationPopup 
          action='block'
          target='entry'
          confirm={blockData}
          containerRef={blockConfirmation}
        />
      }
      <ConfirmationPopup 
        action='delete'
        target='entry'
        confirm={deleteData}
        containerRef={deleteConfirmation}
      />
    </>
    
  ) : (
    <div className={styles.container}>
      <button className={styles.button} onClick={createNewData}>
        <img className={styles.buttonIcon} src={`https://img.icons8.com/android/16/${getButtonColor()}/plus.png`} alt='create button'/>
        <span className='tooltip'>New</span>
      </button>
    </div>
  );
}

export default ActionButtons
