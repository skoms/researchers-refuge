const UserManagement = () => {
  const tempUsers = [
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
  ];
  return (
    <div className="user-management-div">
      <h2 className='title'>User Management</h2>
      <table className='management-table'>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Access Level</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td><input type="text" placeholder='First Name' /></td>
            <td><input type="text" placeholder='Last Name' /></td>
            <td><input type="text" placeholder='E-mail' /></td>
            <td><input type="text" placeholder='Access Level' /></td>
            <td></td>
            <td></td>
            <td>
              <div className="action-buttons">
                <button>
                  <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
                </button>
              </div>
            </td>
          </tr>
          { tempUsers.map( (user, i) => 
              <tr key={i}>
                <td>{user.firstName + i}</td>
                <td>{user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.accessLevel}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
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
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement
