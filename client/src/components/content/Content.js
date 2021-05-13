import React from 'react'

import MyInfoModule from '../myInfoModule/MyInfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'

const Content = props => {
  return (
    <div className='content'>
      <MyInfoModule />
      <Feed />
      <RecommendModule />
    </div>
  )
}

export default Content
