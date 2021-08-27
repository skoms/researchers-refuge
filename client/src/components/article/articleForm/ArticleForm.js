import React, { useEffect } from 'react'
import TopicSelect from '../../topicSelect/TopicSelect'
import { useDispatch, useSelector } from 'react-redux'
import { 
  selectArticle, 
  updateArticleStateByKey,
  updateArticle,
  postArticle
} from '../manageArticle/manageArticleSlice'
import { useParams } from 'react-router'
import { selectAuthenticatedUser } from '../../user/userAccManage/userAccSlice'
import { selectTopic } from '../../feed/feedSlice'


//TODO - Connect and set up the form to actually send in the information filled into it as well as automatically assign author when creating and update where needed
//TODO - Fetch information about the article when 'isUpdate' to fill in all the temporary placeholders
//TODO - set up all the required buttons such as 'Submit(create/update)' 'cancel' etc. 


const ArticleForm = props => {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const topic = useSelector(selectTopic);
  const { id } = useParams();
  const user = useSelector(selectAuthenticatedUser);

  useEffect(() => {
    dispatch(updateArticleStateByKey({ key: 'topic', value: topic }));
  }, [topic, dispatch])

  const onChangeHandler = (e) => {
    dispatch(updateArticleStateByKey({ key: e.target.id, value: e.target.value }));
  }

  const submit = (e) => {
    e.preventDefault();
    const invalidInputs = Object.keys(article).filter( key => !article[key]);
    if (invalidInputs.length > 0) {
      return;
    }
    if ( props.isUpdate ) {
      dispatch(updateArticle({ article: article, id: id, user: user }));
    } else {
      dispatch(postArticle({ article: article, user: user }));
    }
  }

  return (
    <div className='create-update-article-div'>
      <form className="create-update-article-form" onSubmit={submit}>
        <h1 className='h1'>{ props.isUpdate ? 'UPDATE' : 'CREATE' } ARTICLE</h1>
        <div className='form-input title'>
          <input id="title" name="title" type="text" value={ article.title || '' } onChange={onChangeHandler}/>
          <label htmlFor="title">Title</label>
        </div>
        <div className='form-input intro'>
          <input id="intro" name="intro" type="text" value={ article.intro || '' } onChange={onChangeHandler}/>
          <label htmlFor="intro">Intro</label>
        </div>
        <div className='form-input body'>
          <textarea id="body" name="body"  rows='20' cols='60' value={ article.body || '' } onChange={onChangeHandler}/>
          <label htmlFor="body">Body</label>
        </div>
        <div className='form-input date'>
          <input id="published" name="date" type="date" value={ article.published || '' } onChange={onChangeHandler}/>
          <label htmlFor="published">Published: </label>
        </div>
        <div className="form-input topic">
          <TopicSelect use='ArticleForm' />
          <label htmlFor="topic">Topic: </label>
        </div>
        <div className='form-input tags'>
          <input id="tags" name="tags" type="text" value={ article.tags || '' } onChange={onChangeHandler}/>
          <label htmlFor="tags">Tags: (One or more separated by ',')</label>
        </div>
        
        <div className='form-buttons'>
          <button className="button-primary" type="submit">{ props.isUpdate ? 'Update' : 'Create' }</button>
          <button className="button-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ArticleForm
