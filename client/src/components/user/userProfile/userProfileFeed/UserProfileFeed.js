import React from 'react'
import ArticleCards from '../../../article/articleCards/ArticleCards';

const UserProfileFeed = props => {
  const {
    firstName,
    lastName,
    occupation,
    mostActiveField,
    articles,
    credits,
    followers,
    following,
    imgURL
  } = props.user;
  return (
      <div className="user-profile-div">
        <div className="user-profile-info-header">
          <div className="header-img-div">
            <img src="https://placeimg.com/1000/150/tech" alt="header"  className="header-img"/>
            <img 
              src={ imgURL || "https://img.icons8.com/ios-glyphs/120/ffffff/user--v1.png" } 
              alt="profilepic" className={`profile-pic ${imgURL ? "" : "placeholder"}`} 
            />
            { props.owner 
            ?
              <button className='button-primary'>Edit Profile</button>
              
            :
              <button className='button-primary'>Follow</button>
            }
          </div>
          <div className="name-and-occupation">
            <h2 className="full-name">{`${firstName} ${lastName}`}</h2>
            <p className="occupation">{occupation}</p>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="title">Most active field:</p>
              <p className="data">{ mostActiveField || 'None' }</p>
            </div>
            <div className="stat most-active-field">
              <p className="title">Articles:</p>
              <p className="data">{ articles }</p>
            </div>
            <div className="stat">
              <p className="title">Credits:</p>
              <p className="data">{credits}</p>
            </div>
            <div className="stat">
              <p className="title">Followers:</p>
              <p className="data">{ followers.length }</p>
            </div>
            <div className="stat">
              <p className="title">Following:</p>
              <p className="data">{ following.length }</p>
            </div>
          </div>
        </div>
        <div className="articles-published">
          <h2 className="title">Articles Published:</h2>
          {/* Connect sorting feature for the articles */}
          <div className="sort-nav">
            <div>
              <label htmlFor='order-select'>Sort by: </label>
              <select name="order-select" id="order-select">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Credits">Most Credits</option>
                <option value="Least Credits">Least Credits</option>
              </select>
            </div>
            <div>
              <label htmlFor='topic-select'>Topic: </label>
              <select name="topic-select" id="topic-select">
                <option className='default' value="">Select a topic</option>
                <option value="Astrology">Astrology</option>
                <option value="Techology">Techology</option>
                <option value="Psychology">Psychology</option>
                <option value="Archeology">Archeology</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            
          </div>
          <ArticleCards />
        </div>
        <div className="articles-accredited">
          <h2 className="title">Articles Recently Accredited:</h2>
          <ArticleCards />
        </div>
      </div>
  )
}

export default UserProfileFeed
