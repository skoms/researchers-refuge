import React from 'react'

const CreateArticle = () => {
  return (
    <div className='create-article-div'>
      <form className="create-article-form">
        <h1 className='h1'>CREATE ARTICLE</h1>
        <div className='form-input title'>
          <input id="title" name="title" type="text"/>
          <label htmlFor="title">Title</label>
        </div>
        <div className='form-input intro'>
          <input id="intro" name="intro" type="text"/>
          <label htmlFor="intro">Intro</label>
        </div>
        <div className='form-input body'>
          <textarea id="body" name="body"  rows='20' cols='60'/>
          <label htmlFor="body">Body</label>
        </div>
        <div className='form-input date'>
          <input id="date" name="date" type="date"/>
          <label htmlFor="date">Published: </label>
        </div>
        <div className='form-input tags'>
          <input id="tags" name="tags" type="text"/>
          <label htmlFor="tags">Tags: (One or more separated by ',')</label>
        </div>
      </form>
    </div>
  )
}

export default CreateArticle
