import React, { Component } from 'react';
import { mySearchQuery, singleSearchQuery } from '../actions/APIsearch';
import SearchForm from '../containers/SearchForm';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';

import { connect } from 'react-redux';

class WelcomePage extends Component {
  state = { clicked: false }

  toggleRender = () => {
    this.setState({clicked: true})
  }
  
  render() {
    return (
      <React.Fragment>
        <h1>Welcome to The Best Place!</h1>
        <p>Let's find you a place of your interest...</p>
        <SearchForm handleSearch={this.props.mySearchQuery} />
        <hr />
        <div className="row">
          <div className='col-1' />
          <div className="col-3">
            {this.props.mySearchData.map(data => <RenderSearchData key={data.id} handleSearch={this.props.singleSearchQuery} toggleRender={this.toggleRender} place={data} />)}
          </div>
          <div className="col-7">
            {this.state.clicked ? <RenderSinglePlace myPlace={this.props.myPlace} /> : null}
          </div>
          <div className='col-1' />
        </div>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
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