import React from 'react'
import styles from './TypedButton.module.css'

const TypedButton = (props) => {
  if (props.buttontype === 'primary') {
    return (
      <button
        {...props}
        className={`${styles.primaryButton} ${props.className || ''}`}
      >
        {props.content}
      </button>
    )
  } else {
    return (
      <button
        {...props}
        className={`${styles.secondaryButton} ${props.className || ''}`}
      >
        {props.content}
      </button>
    )
  }
}

export default TypedButton
