import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { mySearchQuery, singleSearchQuery, reviewSearchQuery } from '../actions/APIsearch';

import Timeline from '../timeline/index';

const events = [
  {ts: "2017-09-16T12:22:46.587Z", text: 'Just change something'},
  {ts: "2017-09-16T12:21:46.587Z", text: 'You know what'},
  {ts: "2017-09-16T12:20:46.587Z", text: 'I did it'},
  {ts: "2017-09-17T12:22:46.587Z", text: 'Logged in'},
  {ts: "2017-09-17T12:21:46.587Z", text: 'Clicked Home Page'},
  {ts: "2017-09-17T12:20:46.587Z", text: 'Edited Profile'},
  {ts: "2017-09-16T12:22:46.587Z", text: 'Registred'},
  {ts: "2017-09-16T12:21:46.587Z", text: 'Clicked Cart'},
  {ts: "2017-09-16T12:20:46.587Z", text: 'Clicked Checkout'},
];

class Timetable extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </div>

        <Timeline items={events} />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.myList
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    mySearchQuery: url => dispatch(mySearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url)),
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);