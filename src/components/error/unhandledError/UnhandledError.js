import React from 'react'
import styles from '../Error.module.css';
import { useHistory, useLocation } from 'react-router-dom'
import TypedButton from '../../typedButton/TypedButton';
import { getIconUrl } from '../../../Icons';
import { useDispatch } from 'react-redux';
import { updateType, updateTargetId, toggleIsActive } from '../../reportModule/reportModuleSlice';

//TODO - Hook up report bug form

const UnhandledError = props => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { from } = location.state || { from: { pathname: '/' } };

  const openReportModule = () => {
    dispatch(updateType('Bug'));
    dispatch(updateTargetId(0));
    dispatch(toggleIsActive(true));
  }

  const goBack = () => {
    history.push(from);
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={getIconUrl('no-entry', localStorage.getItem('darkmode') === 'true', {
          size: 180, colors: {dark: '38B6FF', light: '1A3861'}
        })} 
        alt='stop-sign'
      />
      <h1 className={styles.status}>{props.statusCode || 500}</h1>
      <p className={styles.message}>
        {props.errorMessage || 'Something went wrong, please try and refresh the page, if the issue persists, please '}
        <span
          onClick={openReportModule}
          className={styles.reportIssueSpan}
        >
          issue a bug report
        </span>
      </p>
      { props.errorStack && <p className={styles.stack}>{props.errorStack}</p> }
      <TypedButton
        buttontype='secondary'
        onClick={goBack}
        content='Go Back'
        className={styles.secondaryButton}
      />
    </div>
  )
}

export default UnhandledError
