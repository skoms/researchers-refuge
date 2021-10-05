import ActionButtons from "./ActionButtons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSortOrder, getSortImg, updateNewData, selectSortOrder } from "../../adminPanelSlice";
import { useSelector } from "react-redux";
import classNames from "classnames";
import DataManager from "./DataManager";

export const ManagementTable = (
    { data, statusFilter = null }
  ) => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);

  const [managerProps, setManagerProps] = useState({ 
    isActive: false,
    source: 'create',
    type: data.type,
    data: data,
    isEntry: false
   });

  const handleSort = e => {
    const { value } = e.target.dataset; 
    dispatch(updateSortOrder(value));
  }

  const inputChangeHandler = e => {
    dispatch(updateNewData({ 
      data: e.target.value, 
      column: e.target.dataset.column, 
      type: data.type
    }));
  }

  const formatEntryData = (entry, column, i) => {
    switch (column.column) {
      case 'createdAt':
        return <td key={i}>{`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}</td>
      case 'updatedAt':
        return <td key={i}>{`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}</td>
      case 'userId':
        return <td key={i}>{`(${entry[column.column]}) ${entry.User.firstName} ${entry.User.lastName}`}</td>
      case 'categoryId':
        return <td key={i}>{`(${entry[column.column]}) ${entry.Category.name}
        `}</td>;
    
      default:
        return <td key={i}>{entry[column.column]}</td>;
    }
  }

  return (
    <>
      <DataManager setManagerProps={setManagerProps} {...managerProps} />
      <table className={
        classNames({
          'management-table': true,
          [statusFilter]: statusFilter !== null
        })
      }>
          <tbody>
            <tr>
              { data.columns.map(column => 
                <th data-value={column.column} key={column.column} onClick={handleSort}>
                  {column.name}
                  { sortOrder.column === column.column && getSortImg(sortOrder) }  
                </th>
              )}
              <th>Actions</th>
            </tr>
            <tr>
              { data.columns.map(column => {
                if (!column.input) return <td key={column.column}></td>;
                return <td key={column.column}><input type="text" data-column={column.column} placeholder={column.name} onChange={inputChangeHandler}/></td>;
              })}
              <td>
                <ActionButtons id={-1} isEntry={false} setManagerProps={setManagerProps} data={data} type={data.type} />
              </td>
            </tr>
            { data && data.entries.length > 0 && data.entries.map( (entry, i) => 
              <tr key={i}>
                { data.columns.map( (column, i) => 
                  formatEntryData(entry, column, i)
                )}
                <td>
                  <ActionButtons id={i} isEntry={true} setManagerProps={setManagerProps} data={entry} type={data.type} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
  )
}
