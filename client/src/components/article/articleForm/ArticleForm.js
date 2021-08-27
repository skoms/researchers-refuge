import React from 'react'
import TopicSelect from '../../topicSelect/TopicSelect'
import { selectArticle, updateArticleStateByKey } from '../manageArticle/manageArticleSlice'
import { useDispatch, useSelector } from 'react-redux'

//TODO - Connect and set up the form to actually send in the information filled into it as well as automatically assign author when creating and update where needed
//TODO - Fetch information about the article when 'isUpdate' to fill in all the temporary placeholders
//TODO - set up all the required buttons such as 'Submit(create/update)' 'cancel' etc. 


const ArticleForm = props => {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);

  const onChangeHandler = (e) => {
    console.log({ key: e.target.id, value: e.target.value });
    dispatch(updateArticleStateByKey({ key: e.target.id, value: e.target.value }));
  }

  return (
    <div className='create-update-article-div'>
      <form className="create-update-article-form">
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
