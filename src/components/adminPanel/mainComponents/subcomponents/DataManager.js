import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice';
import { createEntryAdmin, updateEntryAdmin } from '../../adminPanelSlice';

const DataManager = ({ setManagerProps, isActive, source, data, type }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthenticatedUser);
  const [newData, setNewData] = useState(data);

  const handleInputChange = e => {
    const { column } = e.target.dataset;
    setNewData(prevData => ({
      ...prevData,
      [column]: e.target.value
    }))
  }
  
  const submit = e => {
    e.preventDefault();
    
    if ( source === 'edit' ) {
      dispatch(updateEntryAdmin({  })); //! YET TO IMPLEMENT
    } else if (source === 'create') {
      dispatch(createEntryAdmin({  })) //! YET TO IMPLEMENT
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
  }
  
  if (!isActive) return <></>;
  return (
    <div className={`data-manager data-manager-${source}`} >
      { 
        source === 'view' ? (
          <>
            <table className='management-table'>
              <tbody>
                <tr>
                  <th>Column</th>
                  <th>Value</th>
                </tr>
                { 
                  Object.keys(data).map( key => 
                    <tr key={type + key}>
                      {typeof data[key] !== 'object' ?
                        <th>{key}</th> 
                      :
                        <th>{key + ' (id)'}</th>
                      }
                      { typeof data[key] !== 'object' ? 
                          <td>{data[key]}</td> 
                        :
                          <td>
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
            <div className="buttons">
                <button className='button-secondary' onClick={closePopup}>Close</button>
            </div>
          </>
        ) : source === 'edit' ? (
          <>
            <form className='edit-data-form' onSubmit={submit}>
              {
                Object.keys(data).map( key => { 
                  return (
                    (typeof data[key] !== 'object' || !data[key].id) &&
                    <div key={type + key} className='form-input'>
                      { data[key].toString().length < 50 ?
                          <input id={`new-${key}-${type}`} type="text" data-column={key} value={data[key]} onChange={handleInputChange}/> 
                        :
                          <textarea id={`new-${key}-${type}`} type="text" data-column={key} value={data[key]} onChange={handleInputChange}/>
                      }
                      <label htmlFor={`new-${key}-${type}`}>{key}</label>
                    </div>
                  );
                })
              }
              <div className="buttons">
                <button className='button-primary' type="submit">Edit</button>
                <button className='button-secondary' onClick={closePopup}>Cancel</button>
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
                        <textarea id={`new-${column.column}-${type}`} type="text" data-column={column.column} value={newData[column.column] || ''} onChange={handleInputChange}/> 
                      : 
                        <input id={`new-${column.column}-${type}`} type={column.column !== 'password' ? 'text' : 'password'} data-column={column.column} value={newData[column.column] || ''} onChange={handleInputChange}/>
                    }
                    <label htmlFor={`new-${column.column}-${type}`}>{column.name}</label>
                  </div>
                )
              }
              <div className="buttons">
                <button className='button-primary' type="submit">Create</button>
                <button className='button-secondary' onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </>
        )
      }
    </div>
  )
}

export default DataManager
