import React from 'react'

//TODO - Add onChange to each field to verify input
//TODO - Add onClick on 'cancel' button to take them back whence they came
//TODO - Add onSubmit on form
//TODO - Add 'from' location state in the Link so to fix when they want to go back in their history

const UserRegistration = () => {
  return (
    <div className='user-registration-div'>
      <form className='user-registration-form'>
        <h1 class="card_title">REGISTER NEW USER</h1>
        <div className="form-input first-name">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text"/>
        </div>
        <div className="form-input last-name">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text"/>
        </div>
        <div className="form-input email">
          <label htmlFor="emailAddress">Email</label>
          <input id="emailAddress" name="emailAddress" type="email"/>
        </div>
        <div className="form-input pass">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"/>
        </div>
        <div className="form-input confirm-pass">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password"/>
        </div>
        <div className='form-buttons'>
          <button className="button-primary" type="submit">Sign Up</button>
          <button className="button-secondary">Cancel</button>
        </div>
        <p>Already have a user account? Click here to <a href="/sign-in">sign in</a>!</p>
      </form>
    </div>
  )
}

export default UserRegistration
