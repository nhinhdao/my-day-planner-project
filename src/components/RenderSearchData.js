import React, { Component } from 'react';

class RenderSearchData extends Component {
  handleClick = id => {
    let url = `https://api.foursquare.com/v2/venues/${id}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20160201&limit=20`;
    this.props.handleSearch(url);
  }

  render() {
    const { place } = this.props;
    return (
      <div onClick={() => this.handleClick(place.id)}>
        <p>{place.category}</p>
        <h5>{place.name}</h5>
      </div>
    )
  }
}

export default RenderSearchData;