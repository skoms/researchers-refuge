import React, { useState } from 'react'

const DataManager = ({ setManagerProps, isActive, source, isEntry, data, type }) => {
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
    console.log('submit');
    setManagerProps( prevProps => ({
      ...prevProps,
      isActive: false
    }))
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
            <form className='edit-data-form'>
              {
                Object.keys(data).map( key => { 
                  return (
                    (typeof newData[key] !== 'object' || !newData[key].id) &&
                    <div key={type + key} className='form-input'>
                      { newData[key].toString().length < 50 ?
                          <input id={`new-${key}-${type}`} type="text" data-column={key} value={newData[key]} onChange={handleInputChange}/> 
                        :
                          <textarea id={`new-${key}-${type}`} type="text" data-column={key} value={newData[key]} onChange={handleInputChange}/>
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
