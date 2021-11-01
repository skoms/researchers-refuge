import TypedButton from '../typedButton/TypedButton'
import styles from './ConfirmationPopup.module.css'

const ConfirmationPopup = ({ action, target, confirm, containerRef }) => {
  // closes popup if clicks the blurred background
  const closeOnBlur = (e) => {
    if (e.target.classList.contains(styles.container) && containerRef.current) {
      containerRef.current.classList.add('invisible')
    }
  }

  const cancel = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('invisible')
    }
  }

  return (
    <div className="invisible" ref={containerRef}>
      <div
        className={styles.container}
        data-testid="blurred-background"
        onClick={closeOnBlur}
      >
        <div className={styles.popUp}>
          <p className={styles.p}>
            {`Are you sure you want to ${action} this ${target}?`}
          </p>
          <div className={styles.confirmationButtons}>
            <TypedButton
              buttontype="primary"
              onClick={confirm}
              content={'Yes'}
            />
            <TypedButton
              buttontype="secondary"
              onClick={cancel}
              content={'No'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup
