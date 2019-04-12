import React, { Component } from 'react';
import logo from '../logo.svg';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import SearchPage from './SearchPage';
// import MySavedPlaces from './MySavedPlaces';
import {Container, Menu} from 'semantic-ui-react';
import {getCurrentUser, signOut} from '../actions/APIsearch';
import { connect } from 'react-redux';
import MyPage from './MyPage';

class Homepage extends Component {

  componentDidMount(){
    let userID = localStorage.getItem("userID")
    this.props.getCurrentUser(userID)
  }
  
  handleLogOut = (event) => {
    event.preventDefault();
    this.props.signOut();
    localStorage.clear();
    this.props.history.push('/login');
  }
  
  render() {
    if (!localStorage.getItem("userID")){
      return <Redirect to='/login'/>;
    }
    
    return (
      <div>
        <Router>
          <React.Fragment>
            <header>
              <Menu inverted>
                <Container text>
                  <Menu.Item as={Link} to='/' header>
                    <img src={logo} className="App-logo" alt="logo"/>
                    My Trip Planner
                  </Menu.Item>
                  <Menu.Item as={Link} to='/home'>My Profile</Menu.Item>
                  <Menu.Item as={Link} to='/places'>Search</Menu.Item>
                  <Menu.Item onClick={this.handleLogOut}>Log Out</Menu.Item>
                </Container>
              </Menu>
            </header>
            <Container style={{ marginTop: '1em' }}>
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route exact path="/home" component={MyPage} />
              </Switch>
            </Container>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    getCurrentUser: id => dispatch(getCurrentUser(id))
  }
}

export default connect(null, mapDispatchToProps)(Homepage);