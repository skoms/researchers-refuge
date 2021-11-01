import React, { useState } from 'react'
import styles from './UserLogin.module.css'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import TypedButton from '../../../typedButton/TypedButton'
import { signIn } from '../userAccSlice'

const UserLogin = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const dispatch = useDispatch()

  const change = (e) => {
    switch (e.target.name) {
      case 'emailAddress':
        setEmailAddress(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    await dispatch(signIn({ emailAddress, password }))
      .then((res) => res.payload)
      .then((res) => {
        if (res.status === 200) {
          history.push(from)
        } else if (res.status === 401) {
          setErrors(res.errors)
        } else if (res.status === 500) {
          history.push({
            pathname: '/error',
            state: { from: location.pathname },
          })
        }
      })
      .catch((err) => {
        history.push({ pathname: '/error', state: { from: location.pathname } })
        console.error(err)
      })
  }

  const cancel = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={submit}>
        <h1 className={styles.h1}>LOGIN</h1>
        <div className={styles.errors}>
          {errors ? (
            <ul>
              {errors.map((error, i) => (
                <li key={i} className="error">
                  {error}
                </li>
              ))}
            </ul>
          ) : (
            <React.Fragment />
          )}
        </div>
        <div className={`form-input ${styles.email}`}>
          <label htmlFor="emailAddress">Email</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={change}
          />
        </div>
        <div className={`form-input ${styles.pass}`}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
          />
        </div>
        <div className={styles.formButtons}>
          <TypedButton
            buttontype="primary"
            content="Sign In"
            type="submit"
            onSubmit={submit}
          />
          <TypedButton
            buttontype="secondary"
            content="Cancel"
            onClick={cancel}
          />
        </div>
        <p className={styles.p}>
          Don't have a user account yet? Click here to{' '}
          <a href="/sign-up">sign up</a>!
        </p>
      </form>
    </div>
  )
}

export default UserLogin
