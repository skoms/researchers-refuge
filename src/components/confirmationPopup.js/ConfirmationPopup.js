import styles from './ConfirmationPopup.module.css';

const ConfirmationPopup = ({ action, target, confirm, containerRef }) => {

  const cancel = () => {
    if ( containerRef.current ) {
      containerRef.current.classList.add('invisible');
    }
  }

  return (
    <div className='invisible' ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.popUp}>
          <p className={styles.p}>{`Are you sure you want to ${action} this ${target}?`}</p>
          <div className={styles.confirmationButtons}>
            <button className={`button-primary ${styles.button}`} onClick={confirm}>Yes</button>
            <button className={`button-secondary ${styles.button}`} onClick={cancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup
