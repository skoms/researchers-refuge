import React, { useRef, useState } from 'react'
import styles from './ReportModule.module.css'
import Data from '../../Data'
import TypedButton from '../typedButton/TypedButton';
import { useSelector } from 'react-redux';
import { createReport, selectErrors, selectIsActive, selectTargetId, selectType, toggleIsActive, updateErrors } from './reportModuleSlice';
import { useDispatch } from 'react-redux';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';

const ReportModule = () => {
  const data = new Data();
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const type = useSelector(selectType);
  const id = useSelector(selectTargetId);
  const isActive = useSelector(selectIsActive);
  const errors = useSelector(selectErrors);

  const [selectValue, setSelectValue] = useState('');

  const selectRef = useRef();
  const textareaRef = useRef();

  const getOptions = () => {
    switch (type) {
      case 'User':
        return (
        <>
          <option key={1} value={'offensive language'}>
            {data.capitalize('offensive language')}
          </option>
          <option key={2} value={'inappropriate header and / or profile picture'}>
            {data.capitalize('inappropriate header and / or profile picture')}
          </option>
          <option key={3} value={'spam'}>
            {data.capitalize('spam')}
          </option>
          <option key={4} value={'fake name'}>
            {data.capitalize('fake name')}
          </option>
          <option key={5} value={'impersonation / identity theft'}>
            {data.capitalize('impersonation / identity theft')}
          </option>
          <option key={6} value={'other'}>
            {data.capitalize('other')}
          </option>
        </>
        );
      case 'Article':
        return (
          <>
            <option key={1} value={'offensive language / hate speech'}>
              {data.capitalize('offensive language / hate speech')}
            </option>
            <option key={2} value={'inappropriate content'}>
              {data.capitalize('inappropriate content')}
            </option>
            <option key={3} value={'fraudulent / misleading data'}>
              {data.capitalize('fraudulent / misleading data')}
            </option>
            <option key={4} value={'stolen content'}>
              {data.capitalize('stolen content')}
            </option>
            <option key={5} value={'political propaganda'}>
              {data.capitalize('political propaganda')}
            </option>
            <option key={6} value={'incomplete content'}>
              {data.capitalize('incomplete content')}
            </option>
            <option key={7} value={'other'}>
              {data.capitalize('other')}
            </option>
          </>
        );
      case 'Bug':
        return (
          <>
            <option key={1} value={'unexpected crash'}>
              {data.capitalize('unexpected crash')}
            </option>
            <option key={2} value={'visual content problems'}>
              {data.capitalize('visual content problems')}
            </option>
            <option key={3} value={'a feature is broken'}>
              {data.capitalize('a feature is broken')}
            </option>
            <option key={4} value={'account issues'}>
              {data.capitalize('account issues')}
            </option>
            <option key={5} value={'other'}>
              {data.capitalize('other')}
            </option>
          </>
        );
    
      default:
        return <></>;
    }
  }

  const selectChangeHandler = e => {
    setSelectValue(e.target.value);
  }

  // closes popup if clicks the blurred background
  const closeOnBlur = e => {
    if ( e.target.classList.contains(styles.container) ) {
      dispatch(toggleIsActive());
      dispatch(updateErrors([]));
    }
  }

  const submit = e => {
    e.preventDefault();
    dispatch(updateErrors([]));
    if ( selectValue === '' || textareaRef.current.value === '' ) {
      const newErrors = [];
      if (selectValue === '') {
        newErrors.push('Please select a reason');
      } 
      if ( textareaRef.current.value === '' ) {
        newErrors.push('Please describe the issue');
      }
      dispatch(updateErrors([...newErrors]));
      return;
    } else {
      const report = {  }
      if ( type === 'User' || type === 'Article' ) {
        report.title = `${type} (${id}), ${selectValue}`;
      } else {
        report.title = `${type}, ${selectValue}`;
      }
      report.description = textareaRef.current.value;
      report.userId = user.id;

      dispatch(createReport({ report, user }))
      setSelectValue('');
      textareaRef.current.value = '';
    }
  }

  const cancel = () => {
    dispatch(toggleIsActive());
    dispatch(updateErrors([]));
  }
  
  return (
    <div className={!isActive ? 'invisible' : ''}>
      <div className={styles.container} onClick={closeOnBlur}>
        <form 
          className={styles.popUp} 
          onSubmit={submit}
        >
          <h2>Report {type || 'placeholder'}</h2>
          { errors && 
            <div className="errors">
              <ul>
                {
                  errors.map( (error, i) => 
                    <li key={i} className='error'>{error}</li>
                  )
                }
              </ul>
              
            </div>
          }
          <div 
            className={`form-input ${styles.reason}`} 
            id='reason-input-div'
          >
            <select 
              ref={selectRef}
              className={styles.select} 
              id='reason' 
              name="reason-select"
              onChange={selectChangeHandler}
              value={selectValue}
            >
              <option key={0} value={''}>
                {data.capitalize('please select a reason')}
              </option>
              { getOptions() }
            </select>
            <label htmlFor="reason">Reason: </label>
          </div>

          <div className="form-input">
            <textarea 
              ref={textareaRef}
              name="description" 
              id="description" 
              cols="30" 
              rows="10"
              placeholder='Please give a further description of the issue...'
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <div className={styles.formButtons}>
            <TypedButton 
              buttontype='primary' 
              type='submit' 
              content='Submit Report' 
            />
            <TypedButton 
              buttontype='secondary'
              type='button'
              onClick={cancel}
              content='Cancel'
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default ReportModule
