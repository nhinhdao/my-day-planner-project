import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleTimetable } from '../actions/APIsearch';

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
  {ts: "2019-04-11T13:30", text: 'Central Park'},
];

class Timetable extends Component {

  render() {
    return (
      <div>
        <h1 className="App-title">{this.props.timetable.name}</h1>
        <Timeline items={events} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.mySearch.myList
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    getSingleTimetable: id => dispatch(getSingleTimetable(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);