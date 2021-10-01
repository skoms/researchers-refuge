const ActionButtons = ({ isEntry }) => {
  return isEntry ? (
    <div className="action-buttons">
      <button>
        <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
      </button>
      <button>
        <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
      </button>
      <button>
        <img src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
      </button>
    </div>
  ) : (
    <div className="action-buttons">
      <button>
        <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
      </button>
    </div>
  );
}

export default ActionButtons
