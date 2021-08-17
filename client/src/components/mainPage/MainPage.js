import React, { Fragment, useContext, useEffect, useState } from 'react'

import InfoModule from '../infoModule/InfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'
import { Context } from '../../Context'

const MainPage = props => {
  const context = useContext(Context);
  const [user, setUser] = useState(null);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      setDidLoad(true);
      setUser(context.authenticatedUser);
    }
  }, [context.authenticatedUser, didLoad]);
  
  return (
    <div className='main-page-content'>
      { didLoad && user ? <InfoModule user={user} /> :<Fragment /> }
      <Feed />
      <RecommendModule />
    </div>
  )
}

export default MainPage

