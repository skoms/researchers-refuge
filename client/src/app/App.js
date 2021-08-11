import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//TODO - Import all the components to add in the Switch
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainPage from '../components/mainPage/MainPage';
import ArticleDetails from '../components/article/articleDetails/ArticleDetails';
import CreateArticle from '../components/article/createArticle/CreateArticle';
import UserRegistration from '../components/userRegistration/UserRegistration';
import UserLogin from '../components/userLogin/UserLogin';
import UserProfile from '../components/userProfile/UserProfile';
import MyProfile from '../components/myProfile/MyProfile';

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
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;