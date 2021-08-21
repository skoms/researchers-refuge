//TODO - CHANGE OUT PLACEHOLDERS
//TODO - MAKE SURE TO HOOK UP ALL LINKS

import InfoModule from "../../infoModule/InfoModule";
import RelatedArticles from "./relatedArticles/RelatedArticles";
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDarkModeOn
} from '../../darkmodeButton/darkModeButtonSlice'
import { getArticleInfo, selectArticle, selectAuthor } from "./articleDetailsSlice";
import Loading from "../../loading/Loading";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { useHistory } from "react-router-dom";

const ArticleDetails = props => {
  const darkModeOn = useSelector(selectDarkModeOn);
  const article = useSelector(selectArticle);
  const author = useSelector(selectAuthor);
  const authenticatedUser = useSelector(selectAuthenticatedUser);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    const loadData = async (id) => {
      await dispatch(getArticleInfo(id))
        .then(res => res.payload)
        .then(res => {
          if (res.status === 404) {
            history.push('/not-found');
          }
        });
    }
    if (!didLoad) {
      loadData(id);
      setDidLoad(true);
    }
  }, [didLoad, id, dispatch, history]);
  
  return (
    <div className="content-article-details">
      
      <div className="article-details-sidebar">
        { didLoad && author ? <InfoModule user={author} /> : <Loading /> }
        <RelatedArticles />
      </div>
      
      { didLoad && author && article ? (
        <div className="article-div"> 
        
          { authenticatedUser.id === author.id ? 
            <a href={`/update-article/${id}`}>
              <button className='button-primary'>Edit Article</button>
            </a>
          :
            <Fragment />
          }
          
          <h1>{ article.title }</h1> 
          <div className="article-header">
            <a href={`/users/${author.id}`}>{ `${author.firstName} ${author.lastName}` }</a>
            <p>{'12/11-2007'/* TODO - Fetch and Format createdAtDate */}</p>
          </div>
          <p className="article-intro">{ article.intro }</p>
          <p className="article-body">{ article.body }</p> 
          
          <div className="nav-buttons">
            { parseInt(id, 10) !== 1 
            ?
              <a className="prev" href={`/articles/${parseInt(id, 10) - 1}`}>
                { darkModeOn 
                ?
                  <img src="https://img.icons8.com/ios/50/38B6FF/circled-chevron-left.png" alt="previous button"/>
                :
                  <img src="https://img.icons8.com/ios/50/000000/circled-chevron-left.png" alt="previous button"/>
                }
              </a>
            :
              <a href="/"> </a>
            }
            
            <a className="home" href='/'>
              { darkModeOn 
                ?
                  <img src="https://img.icons8.com/ios/64/38B6FF/home-page.png" alt="home button"/>
                :
                  <img src="https://img.icons8.com/ios/64/000000/home-page.png" alt="home button"/>
              }
            </a>

            <a className="next" href={`/articles/${parseInt(id, 10) + 1}`}>
              { darkModeOn 
                ?
                  <img src="https://img.icons8.com/ios/50/38B6FF/circled-chevron-right.png" alt="next button"/>
                :
                  <img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" alt="next button"/>
              }
            </a>

          </div>
      </div>
      ) : (
        <div className="article-div"> 
          <Loading />
        </div>
      )}
    </div>
  )
}

export default ArticleDetails
