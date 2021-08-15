import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add onSubmit on form
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserLogin = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([  ]);
  const context = useContext(Context);
  const history = useHistory();

  const change = e => {
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

  const Login = () => {
    const res = context.actions.SignIn( emailAddress, password );
    if ( res.status === 200 ) {
      history.push('/');
    } else if ( res.status === 500 ) {
      setErrors(['A server error occured, please try again!']);
    } else {
      setErrors(res.message);
    }
  }
  return (
    <div className='user-login-div'>
      <form className='user-login-form'>
        <h1 class="card_title">LOGIN</h1>
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
          <input id="emailAddress" name="emailAddress" type="email"/>
        </div>
        <div className="form-input pass">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"/>
        </div>
        <div className='form-buttons'>
          <button className="button-primary" type="submit">Sign In</button>
          <button className="button-secondary">Cancel</button>
        </div>
        <p>Don't have a user account yet? Click here to <a href="/sign-up">sign up</a>!</p>
      </form>
    </div>
  )
}

export default UserLogin
