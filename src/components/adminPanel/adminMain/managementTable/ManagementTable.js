import ActionButtons from "../actionButtons/ActionButtons";
import styles from './ManagementTable.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSortOrder, getSortImg, updateNewData, selectSortOrder } from "../../adminPanelSlice";
import { useSelector } from "react-redux";
import DataManager from "../dataManager/DataManager";
import { selectPage } from '../../../paginationBar/paginationBarSlice';
import { getIconUrl } from '../../../../Icons';

const ManagementTable = (
    { data, statusFilter = null }
  ) => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);
  const page = useSelector(selectPage);

  const blockedIcon = <img src={getIconUrl('blocked', null, { size: 16, colors: { light: 'FFFFFF' } })} alt='block button' style={{margin: "0 0 -.1rem 0"}}/>;

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
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            {`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}
          </td>
        )
      case 'updatedAt':
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            {`${entry[column.column].slice(0, 10)} ${entry[column.column].slice(11, 16)}`}
          </td>
        )
      case 'userId':
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            {`(${entry[column.column]}) ${entry.User ? entry.User.firstName : ''} ${entry.User ? entry.User.lastName : ''}`}
          </td>
        )
      case 'categoryId':
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            {`(${entry[column.column]}) ${entry.Category.name}`}
          </td>
        )
      case 'blocked': 
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            { entry[column.column] === true ? 
                <img src={getIconUrl('blocked', null, { size: 16, colors: { light: 'FF2323' } })} alt='block button' style={{margin: "0 0 -.1rem 0"}}/> 
              : 
                <></> 
            }
          </td>
        )
    
      default:
        return (
          <td
            className={styles.tableData}
            key={i}
          >
            {entry[column.column]}
          </td>
        )
    }
  }

  return (
    <>
      <DataManager setManagerProps={setManagerProps} {...managerProps} />
      <table
        className={
          `${styles.table} ${ statusFilter !== null ? statusFilter : '' }`
        }
      >
          <tbody>
            <tr>
              { data.columns.map(column => 
                <th
                  className={styles.tableHeader}
                  data-value={column.column}
                  key={column.column}
                  onClick={handleSort}
                >
                  { column.name !== 'Blocked' ? column.name : blockedIcon }
                  { sortOrder.column === column.column && getSortImg(sortOrder) }  
                </th>
              )}
              <th className={styles.tableHeader}>Actions</th>
            </tr>
            { page === 1 &&
              <tr>
                { data.columns.map(column => {
                  if (!column.input) return (
                    <td
                      className={styles.tableData}
                      key={column.column}
                    >
                    </td>
                  )
                  return (
                    <td
                      className={styles.tableData}
                      key={column.column}
                    >
                      <input
                        type="text"
                        data-column={column.column}
                        placeholder={column.name}
                        onChange={inputChangeHandler}
                        className={styles.tableInput}
                      />
                    </td>
                  );
                })}
                <td className={styles.tableData}>
                  <ActionButtons
                    id={-1}
                    isEntry={false}
                    statusFilter={statusFilter}
                    setManagerProps={setManagerProps}
                    data={data}
                    type={data.type} 
                  />
                </td>
              </tr>
            }
            { data && data.entries.length > 0 && data.entries.map( (entry, i) => 
              <tr key={i}>
                { data.columns.map( (column, i) => 
                  formatEntryData(entry, column, i)
                )}
                <td className={styles.tableData}>
                  <ActionButtons
                    id={entry.id}
                    isEntry={true}
                    statusFilter={statusFilter}
                    setManagerProps={setManagerProps}
                    data={entry}
                    type={data.type}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
  )
}

export default ManagementTable;