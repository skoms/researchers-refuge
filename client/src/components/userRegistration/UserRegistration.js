import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Context } from '../../Context';

//TODO - Add onChange to each field to verify input
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add onSubmit on form
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history
//TODO - Add verification to check whether the password and the confirmed password is the same before submitting the form

const UserRegistration = () => {
  const context = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState([  ]);
  const history = useHistory();
  const location = useLocation();

  const passMatchCheck = (target, value) => {
    if ( password === value ) {
      setPasswordsMatch(true);
      target.classList.contains('missmatch') && target.classList.remove('missmatch');
      console.log(`match, password: ${password} | confirmation: ${value}`);
    } else {
      setPasswordsMatch(false);
      !target.classList.contains('missmatch') && target.classList.add('missmatch');
      console.log(`missmatch, password: ${password} | confirmation: ${value}`);
    }
  }

  const change = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        passMatchCheck(e.target, value);
        break;
      default:
        break;
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/');
  }

  const submit = async (e) => {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: '/' } };
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      // occupation: 'Unknown',
      // mostActiveField: 'none',
      // articles: 0,
      // credits: 0,
      // followers: [  ],
      // following: [  ],
      // imgURL: null,
    };

    passwordsMatch && await context.actions.signUp(user)
      .then(res => {
        switch (res.status) {
          case 201:
            history.push(from);
            break;
          case 401:
            setErrors(res.message);
            break;
          case 500:
            history.push('/error');
            break;
          default:
            break;
        }
      })
  }

  return (
    <div className='user-registration-div'>
      <form className='user-registration-form' onSubmit={submit}>
        <h1 class="card_title">REGISTER NEW USER</h1>
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
        <div className="form-input first-name">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" onChange={change}/>
        </div>
        <div className="form-input last-name">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" onChange={change}/>
        </div>
        <div className="form-input email">
          <label htmlFor="emailAddress">Email</label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={change}/>
        </div>
        <div className="form-input pass">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={change}/>
        </div>
        <div className="form-input confirm-pass">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" onChange={change}/>
        </div>
        <div className='form-buttons'>
          <button className="button-primary" type="submit" onSubmit={submit}>Sign Up</button>
          <button className="button-secondary" onClick={cancel}>Cancel</button>
        </div>
        <p>Already have a user account? Click here to <a href="/sign-in">sign in</a>!</p>
      </form>
    </div>
  )
}

export default UserRegistration
