import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';
import ArticleManagement from './mainComponents/ArticleManagement';
import CategoryManagement from './mainComponents/CategoryManagement';
import ReportCenter from './mainComponents/ReportCenter';
import Statistics from './mainComponents/Statistics';
import TopicManagement from './mainComponents/TopicManagement';
import UserManagement from './mainComponents/UserManagement';
import AdminSidebar from './sidebar/AdminSidebar';

const AdminPanel = () => {
  const history = useHistory();
  const user = useSelector(selectAuthenticatedUser);
  const [didLoad, setDidLoad] = useState(false);
  const [selection, setSelection] = useState('Statistics');

  const select = e => {
    setSelection(e.target.innerHTML);
  }

  useEffect(() => {
    if (!didLoad) {
      if (!user || user.accessLevel !== 'admin') {
        history.push({ pathname: '/forbidden', state: { from: '/' } });
      }
      setDidLoad(true);
    }
  }, [didLoad, user, history]);

  return (
    <div className='admin-panel-div'>
      <AdminSidebar select={select} />
      <div className="panel-main">
        { selection === 'Statistics' && <Statistics />}
        { selection === 'User Management' && <UserManagement />}
        { selection === 'Article Management' && <ArticleManagement />}
        { selection === 'Topic Management' && <TopicManagement />}
        { selection === 'Category Management' && <CategoryManagement />}
        { selection === 'Report Center' && <ReportCenter />}
      </div>
    </div>
  )
}

export default AdminPanel
