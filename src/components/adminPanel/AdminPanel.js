import React, { useEffect, useState } from 'react'
import styles from './AdminPanel.module.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';
import ArticleManagement from './adminMain/articleManagement/ArticleManagement';
import CategoryManagement from './adminMain/categoryManagement/CategoryManagement';
import ReportCenter from './adminMain/reportCenter/ReportCenter';
import Statistics from './adminMain/statistics/Statistics';
import TopicManagement from './adminMain/topicManagement/TopicManagement';
import UserManagement from './adminMain/userManagement/UserManagement';
import AdminSidebar from './adminSidebar/AdminSidebar';
import { selectIsMobile } from '../../app/screenWidthSlice';
import { getIconUrl } from '../../Icons';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';

const AdminPanel = () => {
  const history = useHistory();
  const user = useSelector(selectAuthenticatedUser);
  const [didLoad, setDidLoad] = useState(false);
  const [selection, setSelection] = useState('Statistics');
  const isMobile = useSelector(selectIsMobile);
  const darkModeOn = useSelector(selectDarkModeOn);

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

  return !isMobile ? (
    <div className={styles.container}>
      <AdminSidebar select={select} />
      <div className={styles.mainPanel}>
        { selection === 'Statistics' && <Statistics />}
        { selection === 'User Management' && <UserManagement />}
        { selection === 'Article Management' && <ArticleManagement />}
        { selection === 'Topic Management' && <TopicManagement />}
        { selection === 'Category Management' && <CategoryManagement />}
        { selection === 'Report Center' && <ReportCenter />}
      </div>
    </div>
  ) : (
    <div>
      <img src={getIconUrl('no-entry', darkModeOn, { size: 80 })} alt="forbidden" />
      <p>Admin Panel Not Available</p>
      <p>On Smaller Narrow Screens</p>
      <p>You can try landscape mode if necessary</p>
    </div>
  )
}

export default AdminPanel
