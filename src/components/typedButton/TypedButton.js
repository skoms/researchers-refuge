import React from 'react';
import styles from './TypedButton.module.css';

const TypedButton = props => {

  if (props.buttontype === 'primary') {
    return (
      <button className={styles.primaryButton} {...props}>
        {props.content}
      </button>
    )
  } else {
    return (
      <button className={`${styles.secondaryButton} ${ props.className || '' }`} {...props}>
        {props.content}
      </button>
    )
  }
}

export default TypedButton
