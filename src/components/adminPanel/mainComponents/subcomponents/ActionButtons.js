const ActionButtons = ({ isEntry, setManagerProps, data, type }) => {

  //! ITS PRETTY OBVIOUS ...
  const viewData = () => {
    setManagerProps({ 
      isActive: true,
      source: 'view',
      type: data.type,
      data: data,
      isEntry: true
    })
  }
  const editData = () => {
    setManagerProps({ 
      isActive: true,
      source: 'edit',
      type: data.type,
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
        type: data.type,
        data: data,
        isEntry: false
       }
    ))
  }
  return isEntry ? (
    <div className="action-buttons">
      <button onClick={viewData}>
        <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
      </button>
      <button onClick={editData}>
        <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
      </button>
      <button onClick={toggleDropdownMenu}>
        <img src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
      </button>
      <div data-entry-dropdown-menu className="invisible">
        <button onClick={blockData}>

        </button>
        <button onClick={deleteData}>

        </button>
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
