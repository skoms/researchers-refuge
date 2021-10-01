import ActionButtons from "./ActionButtons";

export const ManagementTable = (
    { handleSort, sortOrder, getSortImg, inputChangeHandler, data }
  ) => {
  const tempData = [
    {
      column: 'firstName',
      name: 'First Name',
      input: true,
    },
    {
      column: 'lastName',
      name: 'Last Name',
      input: true,
    },
    {
      column: 'emailAddress',
      name: 'E-mail',
      input: true,
    },
    {
      column: 'accessLevel',
      name: 'Access Level',
      input: true,
    },
    {
      column: 'createdAt',
      name: 'Created',
      input: false,
    },
    {
      column: 'updatedAt',
      name: 'Last Updated',
      input: false,
    },
  ]
  return (
    <table className='management-table'>
        <tbody>
          <tr>
            { tempData.map(data => 
              <th data-value={data.column} onClick={handleSort}>
                {data.name}
                { sortOrder.column === data.column && getSortImg() }  
              </th>
            )}
            <th>Actions</th>
          </tr>
          <tr>
            { tempData.map(data => {
              if (!data.input) return <td></td>;
              return <td><input type="text" data-column={data.column} placeholder={data.name} onChange={inputChangeHandler}/></td>;
            })}
            <td>
              <ActionButtons isEntry={false} />
            </td>
          </tr>
          { data && data.entries.length > 0 && data.entries.map( (entry, i) => 
            <tr key={i}>
              { tempData.map( data => 
                data.column === 'createdAt' || data.column === 'createdAt' 
                ? ( <td>{`${entry[data.column].slice(0, 10)} ${entry[data.column].slice(11, 16)}`}</td> ) 
                : ( <td>{entry[data.column]}</td> )
              )}
              <td>
              <ActionButtons isEntry={true} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
  )
}
