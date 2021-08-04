import React from 'react'

import InfoModule from '../infoModule/InfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'

const MainPage = props => {
  return (
    <div className='main-page-content'>
      <InfoModule />
      <Feed />
      <RecommendModule />
    </div>
  )
}

export default MainPage

