import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SearchPage from './components/SearchPage';
import MySavedPlaces from './components/MySavedPlaces'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path='/places' component={MySavedPlaces} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
