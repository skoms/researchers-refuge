import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';

//TODO - Import all the components to add in the Switch
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainPage from '../components/mainPage/MainPage';
import ArticleDetails from '../components/article/articleDetails/ArticleDetails';
import ManageArticle from '../components/article/manageArticle/ManageArticle';
import UserRegistration from '../components/user/userAccManage/userRegistration/UserRegistration';
import UserLogin from '../components/user/userAccManage/userLogin/UserLogin';
import UserProfile from '../components/user/userProfile/userProfile/UserProfile';
import MyProfile from '../components/user/userProfile/myProfile/MyProfile';
import Forbidden from '../components/error/forbidden/Forbidden';
import NotFound from '../components/error/notFound/NotFound';
import UnhandledError from '../components/error/unhandledError/UnhandledError';
import SearchResultsPage from '../components/searchResults/SearchResultsPage';
import AdminPanel from '../components/adminPanel/AdminPanel';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/sign-up' component={UserRegistration} />
            <Route exact path='/sign-in' component={UserLogin} />
            <Route exact path='/users/:id' component={UserProfile} />
            <PrivateRoute exact path='/my-profile' component={MyProfile} />
            <Route exact path='/articles/:id' component={ArticleDetails} />
            <PrivateRoute exact path='/write-article' component={ManageArticle} />
            <PrivateRoute exact path='/update-article/:id' component={ManageArticle} />
            <Route exact path='/search/:term' component={SearchResultsPage} />
            <Route exact path='/forbidden' component={Forbidden} />
            <Route exact path='/error' component={UnhandledError} />
            <PrivateRoute exact path='/admin-panel' component={AdminPanel} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;