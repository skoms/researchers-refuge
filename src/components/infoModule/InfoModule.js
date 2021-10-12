import React from 'react'
import styles from './InfoModule.module.css';
import ReactMarkdown from 'react-markdown';
import Data from '../../Data';

const InfoModule = props => {
  const data = new Data();
  const {
    firstName,
    lastName,
    occupation,
    bio,
    mostActiveField,
    articles,
    credits,
    followers,
    following,
    profileImgURL,
    accessLevel
  } = props.user;

  return (
    <div className={styles.container}>
      <img alt='your profile'
        src={ profileImgURL || "https://img.icons8.com/ios-glyphs/75/ffffff/user--v1.png" }
        className={ profileImgURL ? '' : styles.placeholder } 
      />
      <span className={styles.fullName}>
        <p className={styles.fullName}>{ `${data.capitalize(firstName)} ${data.capitalize(lastName)}` }</p>
        {accessLevel === 'admin' ? 
          <img src="https://img.icons8.com/ios-glyphs/16/38B6FF/microsoft-admin--v2.png" alt='admin icon'/> : ''}
      </span>
      <p className={styles.occupation}>{data.capitalize(occupation)}</p>
      <ReactMarkdown className={styles.bio}>{bio}</ReactMarkdown>
      <table>
        <tbody>
          <tr>
            <th>Active in:</th>
            <td>{ data.capitalize(mostActiveField) || '' }</td>
          </tr>
          <tr>
            <th>Articles:</th>
            <td>{ articles || 0 }</td>
          </tr>
          <tr>
            <th>Credits:</th>
            <td>{ credits || 0 }</td>
          </tr>
          <tr>
            <th>Followers:</th>
            <td>{ typeof followers === 'object' ? followers.length : 0 }</td>
          </tr>
          <tr>
            <th>Following:</th>
            <td>{ typeof following === 'object' ? following.length : 0 }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoModule
