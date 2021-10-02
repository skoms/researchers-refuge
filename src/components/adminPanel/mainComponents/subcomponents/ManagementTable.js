import ActionButtons from "./ActionButtons";

export const ManagementTable = (
    { columns, handleSort, sortOrder, getSortImg, inputChangeHandler, data }
  ) => {
  return (
    <table className='management-table'>
        <tbody>
          <tr>
            { columns.map(column => 
              <th column-value={column.column} key={column.column} onClick={handleSort}>
                {column.name}
                { sortOrder.column === column.column && getSortImg() }  
              </th>
            )}
            <th>Actions</th>
          </tr>
          <tr>
            { columns.map(column => {
              if (!column.input) return <td key={column.column}></td>;
              return <td key={column.column}><input type="text" column-column={column.column} placeholder={column.name} onChange={inputChangeHandler}/></td>;
            })}
            <td>
              <ActionButtons isEntry={false} />
            </td>
          </tr>
          { data && data.entries.length > 0 && data.entries.map( (entry, i) => 
            <tr key={i}>
              { columns.map( (column, i) => 
                column.column === 'createdAt' || column.column === 'updatedAt' 
                ? ( <td key={i}>{`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}</td> ) 
                : ( <td key={i}>{entry[column.column]}</td> )
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
