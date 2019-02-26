import React, { Component } from 'react';

class RenderSinglePlace extends Component {
  render() {
    const {myPlace} = this.props
    return (
      <div>
        <h3>{myPlace.name}</h3>
        <img src={myPlace.photo} alt={myPlace.name} />
        <p>{myPlace.rating}</p>
        <p>{myPlace.description}</p>
        <p>Location: {myPlace.location}</p>
        <p>Contact: {myPlace.contact}</p>
        <p>Tips: {myPlace.tips}</p>
      </div>
    )
  }
}
        
export default RenderSinglePlace;