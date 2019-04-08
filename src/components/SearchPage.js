import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import SearchForm from '../containers/SearchForm';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';
import {Grid, Container, Icon, Loader, Button } from 'semantic-ui-react';
import { placesSearchQuery, singleSearchQuery, reviewSearchQuery, signOut, addToListQuery, removeFromListQuery } from '../actions/APIsearch';

import { connect } from 'react-redux';

class SearchPage extends Component {
  state = { clicked: false, isLoading: true, loadData: false }

  toggleLoading = () => {
    this.setState({loadData: true})
  }
  
  handleSearchList = (url) => {
    this.props.placesSearchQuery(url).then(() => this.setState({loadData: false}))
  }

  handleSearchPlace = (code) => {
    const placeUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${code}`
    const reviewUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${code}/reviews`;
    this.props.singleSearchQuery(placeUrl);
    this.props.reviewSearchQuery(reviewUrl).then(() => this.setState({isLoading: false}))
  }

  handleAddFavorite = (place, reviews) => {
    this.props.addToListQuery(place, reviews);
  }

  handleRemoveFromList = place => {
    this.props.removeFromListQuery(place)
  }

  handleLogOut = (event) => {
    event.preventDefault();
    this.props.signOut();
    localStorage.clear();
    this.props.history.push('/');
  }
  
  render() {
    if (!localStorage.getItem("userID")){
      this.props.history.push("/")
    }
    const {places, myPlace} = this.props;
    const reviews = this.props.reviews.map(review => review = {
      id: review.id,
      user_name: review.user.name,
      user_image: review.user.image_url,
      text: review.text,
      time_created: review.time_created,
      rating: review.rating
    })
    return (
      <React.Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span> My Trip Planner! </span>
          <Button size='mini' onClick={this.handleLogOut}>Log Out</Button>
        </header>
        <Container>
          <Grid>
            <Grid.Row textAlign='center' className='searchPage'>
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
                  <React.Fragment>
                    <RenderSinglePlace place={myPlace} reviews={reviews} />
                    {myPlace.isAddedToList ? <Button size='mini' color='teal' onClick={() => this.handleRemoveFromList(myPlace)}>Remove from my list</Button> : 
                      <Button size='mini' color='teal' onClick={() => this.handleAddFavorite(myPlace, reviews)}>Add to my favorite list</Button>
                    }
                  </React.Fragment>
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
    places: state.mySearch.places,
    myPlace: state.mySearch.singlePlace,
    reviews: state.mySearch.reviews
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    placesSearchQuery: url => dispatch(placesSearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url)),
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url)),
    addToListQuery: (place, reviews) => dispatch(addToListQuery(place, reviews)),
    removeFromListQuery: place => dispatch(removeFromListQuery(place)),
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);