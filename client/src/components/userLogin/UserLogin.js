import React from 'react'

//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add onSubmit on form
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserLogin = () => {
  return (
    <div className='user-login-div'>
      <form className='user-login-form'>
        <h1 class="card_title">LOGIN</h1>
        <div className="form-input email">
          <label htmlFor="emailAddress">Email</label>
          <input id="emailAddress" name="emailAddress" type="email"/>
        </div>
        <div className="form-input pass">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"/>
        </div>
        <div className='form-buttons'>
          <button className="button-primary" type="submit">Sign Up</button>
          <button className="button-secondary">Cancel</button>
        </div>
        <p>Don't have a user account yet? Click here to <a href="/sign-up">sign up</a>!</p>
      </form>
    </div>
  )
}

export default UserLogin
