import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  signIn
} from '../userAccSlice';
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add onSubmit on form
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserLogin = () => {
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([  ]);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();


  const change = (e) => {
    switch (e.target.name) {
      case 'emailAddress':  
        setEmailAddress(e.target.value);
        break;
      case 'password':  
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: '/' } };
    await dispatch(signIn({ emailAddress, password }))
      .then(res => res.payload)
      .then(res => {
        if (res.status === 200) {
          history.push(from);
        } else if (res.status === 401) {
          setErrors(res.message);
        } else if (res.status === 500) {
          history.push('/error')
        }
      })
      .catch((err) => {
        history.push('/error');
        console.error(err);
      });
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/');
  }

  return (
    <div className='user-login-div'>
      <form className='user-login-form' onSubmit={submit}>
        <h1 className="card_title">LOGIN</h1>
        <div className="errors">
          { errors 
          ?
            <ul>
              {
                errors.map( error => <li className='error'>{error}</li>)
              }
            </ul>
          :
              <React.Fragment />
          }
        </div>
        <div className="form-input email">
          <label htmlFor="emailAddress">Email</label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={change}/>
        </div>
        <div className="form-input pass">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={change}/>
        </div>
        <div className='form-buttons'>
          <button className="button-primary" type="submit" onSubmit={submit}>Sign In</button>
          <button className="button-secondary" onClick={cancel}>Cancel</button>
        </div>
        <p>Don't have a user account yet? Click here to <a href="/sign-up">sign up</a>!</p>
      </form>
    </div>
  )
}

export default UserLogin
