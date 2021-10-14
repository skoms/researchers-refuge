import React from 'react';
import styles from './TypedButton.module.css';

const TypedButton = props => {

  if (props.buttontype === 'primary') {
    return (
      <button {...props} className={`${ props.className || '' } ${styles.primaryButton}`}>
        {props.content}
      </button>
    )
  } else {
    return (
      <button {...props} className={`${ props.className || '' } ${styles.secondaryButton}`}>
        {props.content}
      </button>
    )
  }
}

export default TypedButton
