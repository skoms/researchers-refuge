import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//TODO - Import all the components to add in the Switch
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainPage from '../components/mainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
        <main>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/1' render={ () => (<h1>It still works just fine!</h1>) } />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;