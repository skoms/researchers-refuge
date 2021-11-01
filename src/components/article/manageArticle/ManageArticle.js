import React from 'react'
import { useLocation } from 'react-router'
import ArticleForm from '../articleForm/ArticleForm'

const ManageArticle = () => {
  const location = useLocation()
  return (
    <div data-testid="manage-article-component">
      <ArticleForm isUpdate={location.pathname.includes('update')} />
    </div>
  )
}

export default ManageArticle
