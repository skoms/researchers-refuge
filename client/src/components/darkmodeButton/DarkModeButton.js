import React, { useState } from 'react'

const DarkModeButton = () => {
  const [darkmodeOn, setDarkmodeOn] = useState(false);

  const toggleDarkmode = () => {
    if (darkmodeOn) {
      setDarkmodeOn(false);
      localStorage.setItem('darkmode', 'true');
    } else {
      setDarkmodeOn(true);
      localStorage.setItem('darkmode', 'false');
    }
    document.getElementsByTagName('body')[0].classList.toggle('darkmode');
    
  }

  window.addEventListener('load', () => {
    if ( localStorage.getItem('darkmode') === 'true' ) {
      document.getElementsByTagName('body')[0].classList.add('darkmode');
    }
  });
  return (
    <div>
      <button className="darkmode-button" onClick={toggleDarkmode}>
        { darkmodeOn 
        ?
        <img src="https://img.icons8.com/material-rounded/24/ffffff/sun--v1.png" alt="darkmode button"/>
        :
          <img src="https://img.icons8.com/ios-filled/20/ffffff/crescent-moon.png" alt="darkmode button"/>
        }
      </button>
    </div>
  )
}

export default DarkModeButton
