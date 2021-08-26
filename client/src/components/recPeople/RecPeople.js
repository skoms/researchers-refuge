import React from 'react'

import tempUsers from '../../data/people';
import ResultRecUser from '../resultRecUser/ResultRecUser';

const RecPeople = () => {
  return (
    <div className='rec-ppl'>
      <h2 className="title">People you may know</h2>
      {
        tempUsers.map( user => (
          <ResultRecUser key={user.id} user={user} />
        )).slice(0,5)
      }
    </div>
  )
}

export default RecPeople
