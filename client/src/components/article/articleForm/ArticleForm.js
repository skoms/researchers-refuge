import React from 'react'

//TODO - Connect and set up the form to actually send in the information filled into it as well as automatically assign author when creating and update where needed
//TODO - Fetch information about the article when 'isUpdate' to fill in all the temporary placeholders
//TODO - set up all the required buttons such as 'Submit(create/update)' 'cancel' etc. 


const ArticleForm = props => {
  return (
    <div className='create-update-article-div'>
      <form className="create-update-article-form">
        <h1 className='h1'>{ props.isUpdate ? 'UPDATE' : 'CREATE' } ARTICLE</h1>
        <div className='form-input title'>
          <input id="title" name="title" type="text" value={ props.isUpdate ? 'SOME TEMPORARY PLACEHOLDER' : '' }/>
          <label htmlFor="title">Title</label>
        </div>
        <div className='form-input intro'>
          <input id="intro" name="intro" type="text" value={ props.isUpdate ? 'SOME TEMPORARY PLACEHOLDER' : '' }/>
          <label htmlFor="intro">Intro</label>
        </div>
        <div className='form-input body'>
          <textarea id="body" name="body"  rows='20' cols='60' value={ props.isUpdate ? 'SOME TEMPORARY PLACEHOLDER' : '' }/>
          <label htmlFor="body">Body</label>
        </div>
        <div className='form-input date'>
          <input id="date" name="date" type="date" value={ props.isUpdate ? '31-08-2020' : '' }/>
          <label htmlFor="date">Published: </label>
        </div>
        <div className='form-input tags'>
          <input id="tags" name="tags" type="text" value={ props.isUpdate ? 'SOME,TEMPORARY,PLACEHOLDER' : '' }/>
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
