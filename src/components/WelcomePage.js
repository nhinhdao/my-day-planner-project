import React, { Component } from 'react';
import { mySearchQuery, singleSearchQuery } from '../actions/APIsearch';
import SearchForm from '../containers/SearchForm';
import { connect } from 'react-redux';

class WelcomePage extends Component {
  handleClick = id => {
    console.log("i am here");
    
    let url = `https://api.foursquare.com/v2/venues/${id}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20160201&near=
    ${this.state.location}&query=${this.state.searchQuery}&limit=20`;
    this.props.singleSearchQuery(url);
  }

  render() {
    const {mySearchData, myPlace} = this.props
    return (
      <div>
        <SearchForm handleSearch={this.props.mySearchQuery}/>
        <div>
          <ul>{mySearchData.map(data => <li key={data.id} onClick={() => this.handleClick(data.id)}>{data.category} - {data.name}</li>)}</ul>
          <hr />
          <h3>{myPlace.name}</h3>
          <img src={myPlace.photo} alt={myPlace.name} />
          <p>{myPlace.rating}</p>
          <p>Location: {myPlace.location}</p>
          <p>Contact: {myPlace.contact}</p>
          <p>Tips: {myPlace.tips}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  
  return {
    mySearchData: state.mySearch.searchData,
    myPlace: state.singleSearch.searchPlace
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    mySearchQuery: url => dispatch(mySearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);