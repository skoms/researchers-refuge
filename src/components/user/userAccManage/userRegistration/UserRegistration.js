import React, { Fragment, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import styles from './UserRegistration.module.css'
import { useDispatch } from 'react-redux'
import { signUp } from '../userAccSlice'
import TypedButton from '../../../typedButton/TypedButton'
import { getIconUrl } from '../../../../Icons'
import { validateField } from '../../../../utils/helpers'

const UserRegistration = () => {
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfRef = useRef()

  const [passwordsMatch, setPasswordsMatch] = useState()
  const [initiatedFocus, setInitiatedFocus] = useState(false)
  const [errors, setErrors] = useState([])
  const history = useHistory()
  const location = useLocation()

  const smallCheckMark = (
    <img
      src={getIconUrl('checkmark', null, {
        size: 12,
        colors: {
          light: '34970d',
        },
      })}
      alt="checkmark"
    />
  )

  const smallCross = (
    <img
      src={getIconUrl('x', null, {
        size: 12,
        colors: {
          light: 'dd3939',
        },
      })}
      alt="cross"
    />
  )

  const listOfErrors = (
    <ul>
      {errors.map((error, index) => (
        <li key={index} className="error">
          {error}
        </li>
      ))}
    </ul>
  )

  const passMatchCheck = (value) => {
    !initiatedFocus && setInitiatedFocus(true)
    const { classList } = passwordConfRef.current
    if (password === value) {
      classList.contains('mismatch') && classList.remove('mismatch')
      !classList.contains('match') && classList.add('match')
      return true
    } else {
      !classList.contains('mismatch') && classList.add('mismatch')
      classList.contains('match') && classList.remove('match')
      return false
    }
  }

  const isReadyToSubmit = (target = null) => {
    const isReady =
      validateField('name', firstName, firstNameRef.current) &&
      validateField('name', lastName, lastNameRef.current) &&
      validateField('email', emailAddress, emailRef.current) &&
      validateField('password', password, passwordRef.current) &&
      (target
        ? target.name !== 'confirmPassword'
          ? passwordsMatch
          : passMatchCheck(target.value)
        : passwordsMatch)
    const button = document.querySelector('#sign-up-btn')
    const { classList } = button
    if (isReady) {
      classList.contains('disabled') && classList.remove('disabled')
      !classList.contains('active') && classList.add('active')
      button.disabled = ''
    } else {
      !classList.contains('disabled') && classList.add('disabled')
      classList.contains('active') && classList.remove('active')
      button.disabled = 'disabled'
    }
    return isReady
  }

  const change = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'firstName':
        setFirstName(value)
        validateField('name', value, firstNameRef.current)
        break
      case 'lastName':
        setLastName(value)
        validateField('name', value, lastNameRef.current)
        break
      case 'emailAddress':
        setEmailAddress(value)
        validateField('email', value, emailRef.current)
        break
      case 'password':
        setPassword(value)
        validateField('password', value, passwordRef.current)
        break
      case 'confirmPassword':
        setPasswordsMatch(passMatchCheck(value))
        break
      default:
        break
    }
    isReadyToSubmit(e.target)
  }

  const cancel = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const submit = async (e) => {
    e.preventDefault()
    const { from } = location.state || { from: { pathname: '/' } }
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    }

    isReadyToSubmit() &&
      (await dispatch(signUp(user))
        .then((res) => {
          return res.error ? res : res.payload
        })
        .then((res) => {
          switch (res.status) {
            case 201:
              history.push(from)
              break
            case 400:
              setErrors(res.errors)
              break
            case 500:
              history.push('/error')
              break
            default:
              break
          }
        }))
  }

  return (
    <div className={styles.container}>
      <form className={styles.registrationForm} onSubmit={submit}>
        <h1 className={styles.h1}>REGISTER NEW USER</h1>
        <div className={styles.errors}>
          {errors ? listOfErrors : <Fragment />}
        </div>

        <div className={`form-input ${styles.firstName}`} ref={firstNameRef}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={change}
          />
          <label htmlFor="firstName">
            First Name{' '}
            {firstName &&
              (validateField('name', firstName, firstNameRef.current)
                ? smallCheckMark
                : smallCross)}
          </label>
        </div>

        <div className={`form-input ${styles.lastName}`} ref={lastNameRef}>
          <input id="lastName" name="lastName" type="text" onChange={change} />
          <label htmlFor="lastName">
            Last Name{' '}
            {lastName &&
              (validateField('name', lastName, lastNameRef.current)
                ? smallCheckMark
                : smallCross)}
          </label>
        </div>

        <div className={`form-input ${styles.email}`} ref={emailRef}>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={change}
          />
          <label htmlFor="emailAddress">
            Email{' '}
            {emailAddress &&
              (validateField('email', emailAddress, emailRef.current)
                ? smallCheckMark
                : smallCross)}
          </label>
        </div>

        <div className={`form-input ${styles.pass}`} ref={passwordRef}>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
          />
          <label htmlFor="password">
            Password{' '}
            {password &&
              (validateField('password', password, passwordRef.current)
                ? smallCheckMark
                : smallCross)}
          </label>
        </div>
        <div
          className={`form-input ${styles.confirmPass}`}
          ref={passwordConfRef}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={change}
          />
          <label htmlFor="confirmPassword">
            Confirmation{' '}
            {initiatedFocus && (passwordsMatch ? smallCheckMark : smallCross)}
          </label>
        </div>
        <div className={styles.formButtons}>
          <TypedButton
            buttontype="primary"
            id="sign-up-btn"
            className="disabled"
            type="submit"
            onSubmit={submit}
            content="Sign Up"
          />
          <TypedButton
            buttontype="secondary"
            onClick={cancel}
            content="Cancel"
          />
        </div>
        <p className={styles.p}>
          Already have a user account? Click here to{' '}
          <a href="/sign-in">sign in</a>!
        </p>
      </form>
    </div>
  )
}

export default UserRegistration
