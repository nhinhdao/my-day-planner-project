import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import SearchForm from '../containers/SearchForm';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';
import {Grid, Container, Segment, Icon, Loader, Button } from 'semantic-ui-react';
import { mySearchQuery, singleSearchQuery, reviewSearchQuery } from '../actions/APIsearch';

import { connect } from 'react-redux';

class SearchPage extends Component {
  state = { clicked: false, isLoading: true, loadData: false }

  toggleLoading = () => {
    this.setState({loadData: true})
  }
  
  handleSearchList = (url) => {
    this.props.mySearchQuery(url).then(() => this.setState({loadData: false}))
  }
  handleSearchPlace = (id) => {
    const placeUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`
    const reviewUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;
    this.props.singleSearchQuery(placeUrl);
    this.props.reviewSearchQuery(reviewUrl).then(() => this.setState({isLoading: false}))
  }
  
  render() {
    const {places} = this.props
    return (
      <React.Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span> My Trip Planner! </span>
        </header>
        <Container>
          <Grid>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                <h1>Let's search around!</h1>
                <Icon color='purple' name='hand point right outline'/>Tips: For random places, just enter your desired location.
                <SearchForm handleSearch={this.handleSearchList} toggleLoading={this.toggleLoading}/>
                { this.state.loadData &&
                  <Loader active inline='centered'/>
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                { places.length > 0 &&
                  <React.Fragment>
                    <RenderSearchData handleSearch={this.handleSearchPlace} places={places}/>
                    <Link to='/places'><Button size='mini'color='blue'>View My Saved Places</Button></Link>
                  </React.Fragment>
                }
              </Grid.Column>
              <Grid.Column width={11}>
                { !this.state.isLoading &&
                  <RenderSinglePlace place={this.props.myPlace} reviews={this.props.reviews} />
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Container>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places,
    myPlace: state.singlePlace,
    reviews: state.reviews
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    mySearchQuery: url => dispatch(mySearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url)),
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);