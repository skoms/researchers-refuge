import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import InfoModule from "../../infoModule/InfoModule";
import RelatedArticles from "./relatedArticles/RelatedArticles";
import Loading from "../../loading/Loading";
import { selectDarkModeOn } from '../../darkmodeButton/darkModeButtonSlice'
import { getArticleInfo, selectArticle, selectAuthor } from "./articleDetailsSlice";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { deleteArticle } from '../manageArticle/manageArticleSlice';
import { selectIsMobile } from '../../../app/screenWidthSlice';
import ConfirmationPopup from '../../confirmationPopup.js/ConfirmationPopup';

const ArticleDetails = () => {
  const darkModeOn = useSelector(selectDarkModeOn);
  const article = useSelector(selectArticle);
  const author = useSelector(selectAuthor);
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isMobile = useSelector(selectIsMobile);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const confirmationPopupRef = useRef();
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    const loadData = async (id) => {
      await dispatch(getArticleInfo(id))
        .then(res => res.payload)
        .then(res => {
          if (res.status === 404) {
            history.push({ pathname: '/not-found', state: { from: location.pathname }});
          }
        });
    }
    if (!didLoad) {
      loadData(id);
      setDidLoad(true);
    }
  }, [didLoad, id, dispatch, history, location.pathname]);

  const togglePopUp = () => {
    const confirmationBox = confirmationPopupRef.current;
    if ( confirmationBox.classList.contains('invisible') ) {
      confirmationBox.classList.remove('invisible');
    } else {
      confirmationBox.classList.add('invisible');
    }
  }
  
  const confirmDeletion = async () => {
    togglePopUp();
    await dispatch(deleteArticle({id: id, user: authenticatedUser}))
      .then(res => res.payload)
      .then(res => {
        if (res.status === 204) {
          history.push({ pathname: '/', state: { from: location.pathname }});
        } else if (res.status === 403) {
          history.push({ pathname: '/forbidden', state: { from: location.pathname }});
        }
      })
      .catch(() => {
        history.push({ pathname: '/error', state: { from: location.pathname }});
      });
  }

  return (
    <div className="content-article-details">

      <ConfirmationPopup 
        action='delete'
        target='article'
        confirm={confirmDeletion}
        containerRef={confirmationPopupRef}
      />
      
      { didLoad && author && article ? (
        <div className="article-div"> 
        
          { authenticatedUser && (authenticatedUser.id === author.id || authenticatedUser.accessLevel === 'admin') ? 
            <div className="owner-buttons">
              <a href={`/update-article/${id}`}>
                <button className='button-primary'>Edit Article</button>
              </a>
              <button className='button-primary' onClick={togglePopUp}>Delete Article</button>
            </div>
          :
            <Fragment />
          }
          
          <h1>{ article.title }</h1> 
          <div className="article-header">
            <a href={`/users/${author.id}`}>{ `${author.firstName} ${author.lastName}` }</a>
            <p>{ article.published }</p>
          </div>
          <ReactMarkdown className="article-intro">{ article.intro }</ReactMarkdown>
          <ReactMarkdown className="article-body">{ article.body }</ReactMarkdown> 
          
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

      { !isMobile &&
        <div className="article-details-sidebar">
          { didLoad && author ? <InfoModule user={author} /> : <Loading /> }
          { didLoad && article ? <RelatedArticles article={article} /> : <Loading /> }
        </div>
      }
      { isMobile && didLoad && author && <InfoModule user={author} /> }
      { isMobile && didLoad && article && <RelatedArticles article={article} /> }
    </div>
  )
}

export default ArticleDetails
