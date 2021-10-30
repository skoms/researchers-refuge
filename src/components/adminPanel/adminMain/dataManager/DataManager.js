import { useEffect } from 'react';
import styles from './DataManager.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useToggle from '../../../../customHooks/useToggle';
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice';
import { createEntryAdmin, updateEntryAdmin, updateNewData } from '../../adminPanelSlice';

const DataManager = ({ setManagerProps, isActive, source, data, type }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthenticatedUser);
  const newData = useSelector( state => state.adminPanel[type].newData );
  const [isLoading, toggleIsLoading] = useToggle(true);

  const handleInputChange = e => {
    dispatch(updateNewData({ 
      data: e.target.value, 
      column: e.target.dataset.column, 
      type
    }));
  }
  
  const submit = async (e) => {
    e.preventDefault();
    
    if ( source === 'edit' ) {
      const updatedData = {
        ...data,
        ...newData
      }
      dispatch( await updateEntryAdmin({ user, type, id: data.id, body: updatedData })); 
    } else if (source === 'create') {
      dispatch( await createEntryAdmin({ user, type, body: newData }));
    }

    setManagerProps( prevProps => ({
      ...prevProps,
      isActive: false
    }));
  }
  
  const closePopup = e => {
    e.preventDefault();
    setManagerProps( prevProps => ({
      ...prevProps,
      isActive: false
    }))
    dispatch(updateNewData({ data: null, type }));
  }

  useEffect(() => {
    if ( source === 'edit' ) {
      Object.keys(data).forEach( key => { 
        updateNewData({ 
          data: data[key],
          column: key,
          type: type
        });
      })
    }
    toggleIsLoading(false);
  }, [isLoading, toggleIsLoading, source, data, type]);
  
  if (!isActive) return <></>;
  return (
    <div className={`${styles.container} ${styles[source]}`} data-testid='data-manager-component'>
      { 
        source === 'view' ? (
          <>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th className={styles.tableHead}>Column</th>
                  <th className={styles.tableHead}>Value</th>
                </tr>
                { 
                  Object.keys(data).map( key => 
                    <tr key={type + key}>
                      {typeof data[key] !== 'object' ?
                        <th className={styles.tableHead}>
                          {key}
                        </th> 
                      :
                        <th className={styles.tableHead}>
                          {key + ' (id)'}
                        </th>
                      }
                      { typeof data[key] !== 'object' ? 
                          <td className={styles.tableData}>{data[key]}</td> 
                        :
                          <td className={styles.tableData}>
                            {Object.keys(data[key]).map( (val, i) => 
                              Object.keys(data[key]).length - 1 !== i ? 
                                data[key][val] + ', ' 
                              :
                                data[key][val]
                            )}
                          </td>
                      }
                    </tr>
                  )
                }
              </tbody>
            </table>
            <div className={styles.buttons}>
                <button 
                  className={styles.buttonSecondary} 
                  onClick={closePopup}
                >
                  Close
                </button>
            </div>
          </>
        ) : source === 'edit' ? (
          <>
            <form className={styles.editDataForm} onSubmit={submit}>
              {
                Object.keys(data).map( key => { 
                  return (
                    (typeof data[key] !== 'object' || !data[key].id) &&
                    <div 
                      key={type + key}
                      className='form-input'
                    >
                      { data[key].toString().length < 50 ?
                          <input 
                            className={styles.input} 
                            id={`new-${key}-${type}`} 
                            type="text" data-column={key} 
                            value={newData[key] || data[key]} 
                            onChange={handleInputChange}
                          /> 
                        :
                          <textarea 
                            className={styles.textarea} 
                            id={`new-${key}-${type}`} 
                            type="text" data-column={key} 
                            value={newData[key] || data[key]} 
                            onChange={handleInputChange}
                          />
                      }
                      <label 
                        className={styles.label} 
                        htmlFor={`new-${key}-${type}`}
                      >
                        {key}
                      </label>
                    </div>
                  );
                })
              }
              <div className={styles.buttons}>
                <button 
                  className={styles.buttonPrimary} 
                  type="submit"
                >
                  Edit
                </button>
                <button 
                  className={styles.buttonSecondary} 
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={submit}>
              {
                data.requiredColumns
                .map( column => 
                  <div key={type + column.column} className='form-input'>
                    { column.needsTextArea ? 
                        <textarea 
                          className={styles.textarea} 
                          id={`new-${column.column}-${type}`} 
                          type="text" data-column={column.column}
                          value={newData[column.column] || ''} 
                          onChange={handleInputChange}
                        /> 
                      : 
                        <input 
                          className={styles.input} 
                          id={`new-${column.column}-${type}`} 
                          type={column.column !== 'password' ? 'text' : 'password'} 
                          data-column={column.column} 
                          value={newData[column.column] || ''} 
                          onChange={handleInputChange}
                        />
                    }
                    <label 
                      className={styles.label} 
                      htmlFor={`new-${column.column}-${type}`}
                    >
                      {column.name}
                    </label>
                  </div>
                )
              }
              <div className={styles.buttons}>
                <button 
                  className={styles.buttonPrimary}
                  type="submit"
                >
                  Create
                </button>
                <button 
                  className={styles.buttonSecondary} 
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )
      }
    </div>
  )
}

export default DataManager
