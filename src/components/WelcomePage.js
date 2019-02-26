import React, { Component } from 'react';
import { mySearchQuery, singleSearchQuery } from '../actions/APIsearch';
import SearchForm from '../containers/SearchForm';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';

import { connect } from 'react-redux';

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <SearchForm handleSearch={this.props.mySearchQuery} />
        {this.props.mySearchData.map(data => <RenderSearchData key={data.id} handleSearch={this.props.singleSearchQuery} place={data}/> )}
        <hr />
        <RenderSinglePlace myPlace={this.props.myPlace} />
      </div>
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