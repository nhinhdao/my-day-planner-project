import React, { Component } from 'react';
import Timeline from '../timeline/index';

class Timetable extends Component {

  render() {
    const {timetable} = this.props
    const places = [...this.props.timetable.places].sort(function(a, b) {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    });
    const events = places.map(place => place = {
      ts: place.time, text: place.name, place: place
    })

    return (
      <div>
        <h1 className="App-title">{timetable.name}</h1>
        <Timeline updatePlace={this.props.updatePlace} handleDelete={this.props.handleDelete} timetableID={timetable.id} items={events} />
      </div>
    );
  }
}

export default Timetable;