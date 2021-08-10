import React from 'react'
import ArticleCards from '../article/articleCards/ArticleCards'

const UserProfileFeed = props => {
  return (
      <div className="user-profile-div">
        <div className="user-profile-info-header">
          <div className="header-img-div">
            <img src="https://placeimg.com/1000/150/tech" alt="header"  className="header-img"/>
            <img src="https://placeimg.com/120/120/people" alt="profilepic" className="profile-pic" />
            { props.owner 
            ?
              <button className='button-primary'>Edit Profile</button>
              
            :
              <button className='button-primary'>Follow</button>
            }
          </div>
          <div className="name-and-occupation">
            <h2 className="full-name">Kari Nordmann</h2>
            <p className="occupation">Unemployed</p>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="title">Most active field:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Articles:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Credits:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Followers:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Following:</p>
              <p className="data">n</p>
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
