import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice';
import TopicSelect from '../../../topicSelect/TopicSelect';

const EditProfile = ({ toggleEdit }) => {
  const [form, setForm] = useState('My Profile');
  const darkModeOn = useSelector(selectDarkModeOn);
  const tempUser = {
    title: '',
    intro: '',
  }
  const selectForm = (e) => {
    setForm(e.target.innerHTML);
  }
  const onChangeHandler = () => {

  }
  const submit = () => {

  }
  const cancel = (e) => {
    e.preventDefault();
    toggleEdit();
  }
  return (
    <div className="edit-popup">
      <div id='edit-profile-div'>
        <div className="edit-header"> 
          <h2>Edit Profile</h2>
          <button className='exit-button' onClick={toggleEdit}>
            <img src={`https://img.icons8.com/ios-filled/16/${ darkModeOn ? 'E8F7FF' : '1A3861'}/x.png`} alt='Exit button'/>
          </button>
        </div>
        <div className="edit-sidebar">
          <button onClick={selectForm}>My Profile</button>
          <hr />
          <button onClick={selectForm}>My Account</button>
        </div>
        <div className="edit-main">
          { form === 'My Profile' &&
            <form className="edit-user-form" onSubmit={submit}>
              <h1 className='h1'>My Profile</h1>
              <div className='form-input firstName' id='firstName-input-div'>
                <input id="firstName" name="firstName" type="text" value={ tempUser.firstName || '' } onChange={onChangeHandler}/>
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className='form-input lastName' id='lastName-input-div'>
                <input id="lastName" name="lastName" type="text" value={ tempUser.lastName || '' } onChange={onChangeHandler}/>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className='form-input occupation' id='occupation-input-div'>
                <input id="occupation" name="occupation" type="text" value={ tempUser.occupation || '' } onChange={onChangeHandler}/>
                <label htmlFor="occupation">Occupation</label>
              </div>
              <div className="form-input mostActiveField" id='mostActiveField-input-div'>
                <TopicSelect use='ArticleForm' />
                <label htmlFor="mostActiveField">Most Active Field: </label>
              </div>
              <div className='form-input bio' id='bio-input-div'>
                <input id="bio" name="bio" type="text" value={ tempUser.bio || '' } onChange={onChangeHandler} placeholder='Uses Markdown formatting'/>
                <label htmlFor="bio">Bio</label>
                <a href="https://www.markdownguide.org/cheat-sheet" target='_blank' rel='noreferrer'>Markdown Cheat Sheet</a>
              </div>
              <div className='form-buttons'>
                <button className="button-primary" type="submit">Update</button>
                <button className="button-secondary" onClick={cancel}>Cancel</button>
              </div>
            </form>
          }
          { form === 'My Account' &&
            <form className="edit-user-form" id='edit-account' onSubmit={submit}>
              <h1 className='h1'>My Account</h1>
              <div className='form-input email' id='email-input-div'>
                <input id="email" name="email" type="text" value={ tempUser.email || '' } onChange={onChangeHandler}/>
                <label htmlFor="email">Email</label>
              </div>
              <div className='form-input oldPass' id='oldPass-input-div'>
                <input id="oldPass" name="oldPass" type="text" value={ tempUser.oldPass || '' } onChange={onChangeHandler}/>
                <label htmlFor="oldPass">Current Password</label>
              </div>
              <div className='form-input pass' id='pass-input-div'>
                <input id="pass" name="pass" type="text" value={ tempUser.pass || '' } onChange={onChangeHandler}/>
                <label htmlFor="pass">New Password</label>
              </div>
              <div className='form-input confPass' id='confPass-input-div'>
                <input id="confPass" name="confPass" type="text" value={ tempUser.confPass || '' } onChange={onChangeHandler}/>
                <label htmlFor="confPass">Confirm Password</label>
              </div>
              <div className='form-buttons'>
                <button className="button-primary" type="submit">Update</button>
                <button className="button-secondary" onClick={cancel}>Cancel</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default EditProfile
