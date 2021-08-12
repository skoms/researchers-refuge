import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//TODO - Import all the components to add in the Switch
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainPage from '../components/mainPage/MainPage';
import ArticleDetails from '../components/article/articleDetails/ArticleDetails';
import CreateArticle from '../components/article/createArticle/CreateArticle';
import UpdateArticle from '../components/article/updateArticle/UpdateArticle';
import UserRegistration from '../components/userRegistration/UserRegistration';
import UserLogin from '../components/userLogin/UserLogin';
import UserProfile from '../components/userProfile/UserProfile';
import MyProfile from '../components/myProfile/MyProfile';
import Forbidden from '../components/error/forbidden/Forbidden';
import NotFound from '../components/error/notFound/NotFound';
import UnhandledError from '../components/error/unhandledError/UnhandledError';

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
            <Route path='/users/:id' component={UserProfile} />
            <Route path='/my-profile' component={MyProfile} />
            <Route path='/articles/:id' component={ArticleDetails} />
            <Route path='/create-article' component={CreateArticle} />
            <Route path='/update-article/:id' component={UpdateArticle} />
            <Route path='/forbidden' component={Forbidden} />
            <Route path='/error' component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;