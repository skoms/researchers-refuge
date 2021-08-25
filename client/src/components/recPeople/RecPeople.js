import React from 'react'

import tempUsers from '../../data/people';
import RecUser from '../recUser/RecUser';

const RecPeople = () => {
  return (
    <div className='rec-ppl'>
      <h2 className="title">People you may know</h2>
      {
        tempUsers.map( user => (
          <RecUser user={user} />
        )).slice(0,5)
      }
    </div>
  )
}

export default RecPeople
