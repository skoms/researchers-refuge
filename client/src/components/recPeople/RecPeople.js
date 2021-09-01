import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import ResultRecUser from '../resultRecUser/ResultRecUser';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';
import { getRecPeople, selectRecPeople } from './recPeopleSlice';

const RecPeople = () => {
  const [didLoad, setDidLoad] = useState(false);
  const user = useSelector(selectAuthenticatedUser);
  const recPeople = useSelector(selectRecPeople);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didLoad) {
      dispatch(getRecPeople(user));
      setDidLoad(true);
    }
  }, [didLoad, user, dispatch]);

  return (
    <div className='rec-ppl'>
      <h2 className="title">People you may know</h2>
      { recPeople &&
        recPeople.map( recUser => (
          <ResultRecUser key={recUser.id} type='rec' user={recUser} />
        )).slice(0,5)
      }
    </div>
  )
}

export default RecPeople
