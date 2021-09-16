import React, { Fragment, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { useDispatch } from 'react-redux';
import {
  signUp
} from '../userAccSlice';
import Data from '../../../../Data';

//TODO - Add onChange to each field to verify input
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserRegistration = () => {
  const dispatch = useDispatch();
  const data = new Data();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [passwordsMatch, setPasswordsMatch] = useState();
  const [initiatedFocus, setInitiatedFocus] = useState(false);
  const [errors, setErrors] = useState([  ]);
  const history = useHistory();
  const location = useLocation();

  const smallCheckmark = <img src="https://img.icons8.com/ios-filled/12/34970d/checkmark--v1.png" alt="checkmark"/>;
  const smallCross = <img src="https://img.icons8.com/ios-filled/12/dd3939/x.png"  alt="cross"/>;
  const listOfErrors = <ul>{ errors.map( error => <li className='error'>{error}</li>) }</ul>;

  const passMatchCheck = (value) => {
    !initiatedFocus && setInitiatedFocus(true);
    const { classList } =  document.querySelector('.confirm-pass');
    if ( password === value ) {
      classList.contains('mismatch') && classList.remove('mismatch');
      !classList.contains('match') && classList.add('match');
      return true
    } else {
      !classList.contains('mismatch') && classList.add('mismatch');
      classList.contains('match') && classList.remove('match');
      return false
    }
  }

  const isReadyToSubmit = (target = null) => {
    const isReady = ( 
      data.validateField('name', firstName, '.first-name') &&
      data.validateField('name', lastName, '.last-name') &&
      data.validateField('email', emailAddress, '.email') &&
      data.validateField('password', password, '.pass') &&
      ( target ? 
        (target.name !== 'confirmPassword' ? passwordsMatch : passMatchCheck(target.value)) 
        : passwordsMatch
      )
    );
    const button = document.querySelector('#sign-up-btn');
    const { classList } = button;
    if ( isReady ) {
      classList.contains('disabled') && classList.remove('disabled');
      !classList.contains('active') && classList.add('active');
      button.disabled = "";
    } else {
      !classList.contains('disabled') && classList.add('disabled');
      classList.contains('active') && classList.remove('active');
      button.disabled = "disabled";
    }
    return isReady;
  }

  const change = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        data.validateField('name', value, '.first-name');
        break;
      case 'lastName':
        setLastName(value);
        data.validateField('name', value, '.last-name');
        break;
      case 'emailAddress':
        setEmailAddress(value);
        data.validateField('email', value, '.email');
        break;
      case 'password':
        setPassword(value);
        data.validateField('password', value, '.pass');
        break;
      case 'confirmPassword':
        setPasswordsMatch(passMatchCheck(value));
        break;
      default:
        break;
    }
    isReadyToSubmit(e.target);
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
    };

    isReadyToSubmit() && await dispatch(signUp(user))
      .then(res => res.payload)
      .then(res => {
        switch (res.status) {
          case 201:
            history.push(from);
            break;
          case 400:
            setErrors(res.errors);
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
        <h1 className="card_title">REGISTER NEW USER</h1>
        <div className="errors">
          { errors ? listOfErrors : <Fragment /> }
        </div>

        <div className="form-input first-name">
          <label htmlFor="firstName">
            First Name { firstName && ( data.validateField('name', firstName, '.first-name') ? smallCheckmark : smallCross ) }
          </label>
          <input id="firstName" name="firstName" type="text" onChange={change}/>
        </div>

        <div className="form-input last-name">
          <label htmlFor="lastName">
            Last Name { lastName && ( data.validateField('name', lastName, '.last-name') ? smallCheckmark : smallCross ) }
          </label>
          <input id="lastName" name="lastName" type="text" onChange={change}/>
        </div>

        <div className="form-input email">
          <label htmlFor="emailAddress">
            Email { emailAddress && (data.validateField('email', emailAddress, '.email') ? smallCheckmark : smallCross ) }
          </label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={change}/>
        </div>

        <div className="form-input pass">
            <label htmlFor="password">
            Password { password && ( data.validateField('password', password, '.pass') ? smallCheckmark : smallCross ) }
            </label>
            <input id="password" name="password" type="password" onChange={change}/>
        </div>
        <div className="form-input confirm-pass">
          <label htmlFor="confirmPassword">
            Confirmation { initiatedFocus && ( passwordsMatch ? smallCheckmark : smallCross ) }
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" onChange={change}/>
          
        </div>
        <div className='form-buttons'>
          <button id="sign-up-btn" className="button-primary disabled" type="submit" onSubmit={submit}>Sign Up</button>
          <button className="button-secondary" onClick={cancel}>Cancel</button>
        </div>
        <p>Already have a user account? Click here to <a href="/sign-in">sign in</a>!</p>
      </form>
    </div>
  )
}

export default UserRegistration
