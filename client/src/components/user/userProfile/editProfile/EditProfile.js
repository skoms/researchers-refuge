import React from 'react'
import { useSelector } from 'react-redux';
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice';
import TopicSelect from '../../../topicSelect/TopicSelect';

const EditProfile = () => {
  const darkModeOn = useSelector(selectDarkModeOn);
  const tempUser = {
    title: '',
    intro: '',
  }
  const onChangeHandler = () => {

  }
  const submit = () => {

  }
  const cancel = () => {

  }
  return (
    <div id='edit-profile-div'>
      <div className="edit-header"> 
        <h2>Edit Profile</h2>
        <button className='exit-button'>
          <img src={`https://img.icons8.com/ios-filled/16/${ darkModeOn ? 'E8F7FF' : '1A3861'}/x.png`} alt='Exit button'/>
        </button>
      </div>
      <div className="edit-sidebar">
        <button><p className="profile">My Profile</p></button>
        <hr />
        <button><p className="account">My Account</p></button>
      </div>
      <div className="edit-main">
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
      </div>
    </div>
  )
}

export default EditProfile
