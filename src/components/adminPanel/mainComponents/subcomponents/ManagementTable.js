import ActionButtons from "./ActionButtons";
import { useDispatch } from "react-redux";
import { updateSortOrder, getSortImg, updateNewData } from "../../adminPanelSlice";

export const ManagementTable = (
    { columns, sortOrder, data }
  ) => {
  const dispatch = useDispatch();

  const handleSort = e => {
    const { value } = e.target.dataset; 
    dispatch(updateSortOrder(value));
  }

  const inputChangeHandler = e => {
    dispatch(updateNewData({ 
      data: e.target.value, 
      column: e.target.dataset, 
      type: data.type
    }));
  }

  return (
    <table className='management-table'>
        <tbody>
          <tr>
            { columns.map(column => 
              <th data-value={column.column} key={column.column} onClick={handleSort}>
                {column.name}
                { sortOrder.column === column.column && getSortImg(sortOrder) }  
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
              <ActionButtons isEntry={false} data={data} />
            </td>
          </tr>
          { data && data.entries.length > 0 && data.entries.map( (entry, i) => 
            <tr key={i}>
              { columns.map( (column, i) => 
                column.column === 'createdAt' || column.column === 'updatedAt' 
                  ? ( <td key={i}>{`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}</td> ) 
                  : column.column === 'userId' 
                    ? ( <td key={i}>{`(${entry[column.column]}) ${entry.User.firstName} ${entry.User.lastName}`}</td> ) 
                    : ( <td key={i}>{entry[column.column]}</td> )
              )}
              <td>
              <ActionButtons isEntry={true} data={data} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
  )
}
