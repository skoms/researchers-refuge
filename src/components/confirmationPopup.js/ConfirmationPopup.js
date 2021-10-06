const ConfirmationPopup = ({ action, target, confirm, containerRef }) => {

  const cancel = () => {
    if ( containerRef.current ) {
      containerRef.current.classList.add('invisible');
    }
  }

  return (
    <div className='invisible' ref={containerRef}>
      <div className="confirmation">
        <div className="pop-up">
          <p>{`Are you sure you want to ${action} this ${target}?`}</p>
          <div className="confirmation-buttons">
            <button className='button-primary' onClick={confirm}>Yes</button>
            <button className='button-secondary' onClick={cancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup
