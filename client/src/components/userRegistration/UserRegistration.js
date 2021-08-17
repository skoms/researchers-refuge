import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Context } from '../../Context';

//TODO - Add onChange to each field to verify input
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserRegistration = () => {
  const context = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  /* Name regex to also include international names written in the latin alphabet */
  const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/;
  /* A simple email regex to do the trick */
  const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  /* password: 8-20 characters, at least 1 uppercase, 1 lowercase and one digit */
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

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
      setPasswordsMatch(true);
      classList.contains('missmatch') && classList.remove('missmatch');
      !classList.contains('match') && classList.add('match');
    } else {
      setPasswordsMatch(false);
      !classList.contains('missmatch') && classList.add('missmatch');
      classList.contains('match') && classList.remove('match');
    }
  }

  const fieldIsValid = (regex, targetValue, targetQuery) => {
    const fitsRequirements = regex.test(targetValue);
    const { classList } = document.querySelector(targetQuery);
    if ( fitsRequirements ) {
      classList.contains('missmatch') && classList.remove('missmatch');
      !classList.contains('match') && classList.add('match');
      return true;
    } else if (targetValue === '') {
      classList.contains('missmatch') && classList.remove('missmatch');
      classList.contains('match') && classList.remove('match');
    } else {
      !classList.contains('missmatch') && classList.add('missmatch');
      classList.contains('match') && classList.remove('match');
      return false;
    }
  }

  const isReadyToSubmit = () => {
    const isReady = ( 
      fieldIsValid(nameRegex, firstName, '.first-name') &&
      fieldIsValid(nameRegex, lastName, '.last-name') &&
      fieldIsValid(emailRegex, emailAddress, '.email') &&
      fieldIsValid(passwordRegex, password, '.pass') &&
      passwordsMatch
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
        fieldIsValid(nameRegex, value, '.first-name');
        break;
      case 'lastName':
        setLastName(value);
        fieldIsValid(nameRegex, value, '.last-name');
        break;
      case 'emailAddress':
        setEmailAddress(value);
        fieldIsValid(emailRegex, value, '.email');
        break;
      case 'password':
        setPassword(value);
        fieldIsValid(passwordRegex, value, '.pass');
        break;
      case 'confirmPassword':
        passMatchCheck(value);
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
    };

    isReadyToSubmit() && await context.actions.signUp(user)
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

  useEffect(() => {
    isReadyToSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, emailAddress, password, passwordsMatch])

  return (
    <div className='user-registration-div'>
      <form className='user-registration-form' onSubmit={submit}>
        <h1 className="card_title">REGISTER NEW USER</h1>
        <div className="errors">
          { errors ? listOfErrors : <Fragment /> }
        </div>

        <div className="form-input first-name">
          <label htmlFor="firstName">
            First Name { firstName && ( fieldIsValid(nameRegex, firstName, '.first-name') ? smallCheckmark : smallCross ) }
          </label>
          <input id="firstName" name="firstName" type="text" onChange={change}/>
        </div>

        <div className="form-input last-name">
          <label htmlFor="lastName">
            Last Name { lastName && ( fieldIsValid(nameRegex, lastName, '.last-name') ? smallCheckmark : smallCross ) }
          </label>
          <input id="lastName" name="lastName" type="text" onChange={change}/>
        </div>

        <div className="form-input email">
          <label htmlFor="emailAddress">
            Email { emailAddress && (fieldIsValid(emailRegex, emailAddress, '.email') ? smallCheckmark : smallCross ) }
          </label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={change}/>
        </div>

        <div className="form-input pass">
            <label htmlFor="password">
            Password { password && ( fieldIsValid(passwordRegex, password, '.pass') ? smallCheckmark : smallCross ) }
            </label>
            <input id="password" name="password" type="password" onChange={change}/>
        </div>
        <div className="form-input confirm-pass">
          <label htmlFor="confirmPassword">
            Confirm Password { initiatedFocus && ( passwordsMatch ? smallCheckmark : smallCross ) }
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
