import React, { Component } from 'react';
import Timetable from './Timetable';
import SearchForm from '../containers/SearchForm';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';
import AddToTimetable from '../containers/AddToTimetable';
import {Grid, Icon, Loader, Button, Segment } from 'semantic-ui-react';
import { 
  placesSearchQuery, 
  singleSearchQuery, 
  reviewSearchQuery, 
  addToListQuery, 
  removeFromListQuery,
  getAllTimetables,
  getSingleTimetable,
  createNewTimetable,
  updatePlace
 } from '../actions/APIsearch';

import { connect } from 'react-redux';

class SearchPage extends Component {
  constructor(){
    super();
    this.state = {
      clicked: false, 
      isLoading: true, 
      loadData: false, 
      addTimetable: false,
      timetable: null
    };
    this.addPlaceToTimetable = this.addPlaceToTimetable.bind(this);
    this.getTimetable = this.getTimetable.bind(this);
    this.updateTimetablePlace = this.updateTimetablePlace.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this)
  }

  componentDidMount(){
    this.props.getAllTimetables();
  }

  async getTimetable(name){
    await this.props.getAllTimetables();
    let timetable = this.props.timetables.find(timetable => timetable.name === name);
    if (timetable){
      this.setState({timetable: timetable})
    }
    else {
      this.props.createNewTimetable(name).then(() => this.setState({timetable: this.props.timetable}))
    }
  }

  async addPlaceToTimetable(time){
    const {myPlace} = this.props;

    const reviews = this.props.reviews.map(review => review = {
      id: review.id,
      user_name: review.user.name,
      user_image: review.user.image_url,
      text: review.text,
      time_created: review.time_created,
      rating: review.rating
    })

    const  newPlace = {
      user_id: localStorage.getItem("userID"),
      timetable_id: this.state.timetable.id,
      time: time,
      code: myPlace.code,
      name: myPlace.name,
      category: myPlace.category,
      contact: myPlace.contact,
      location: myPlace.location,
      rating: myPlace.rating,
      photos: myPlace.photos,
      isAddedToList: true,
      reviews: reviews
    };
    // debugger
    await this.props.addToListQuery(newPlace);
    this.props.getSingleTimetable(this.state.timetable.id).then(() => this.setState({timetable: this.props.timetable}))
  }

  async updateTimetablePlace(place){
    await this.props.updatePlace(place);
    this.props.getSingleTimetable(this.state.timetable.id).then(() => this.setState({timetable: this.props.timetable}))
  }

  toggleLoading = () => {
    this.setState({loadData: true})
  }
  
  handleSearchList = (url) => {
    this.props.placesSearchQuery(url).then(() => this.setState({loadData: false}))
  }

  toggleAddTimetable = () => {
    this.setState({addTimetable: true})
  }

  handleSearchPlace = (code) => {
    const placeUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${code}`
    const reviewUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${code}/reviews`;
    this.props.singleSearchQuery(placeUrl);
    this.props.reviewSearchQuery(reviewUrl).then(() => this.setState({isLoading: false, addTimetable: false}))
  }

  handleAddFavorite = (place, reviews) => {
    this.props.addToListQuery(place, reviews);
  }

  async handleRemoveFromList(place){
    await this.props.removeFromListQuery(place);
    this.props.getSingleTimetable(this.state.timetable.id).then(() => this.setState({timetable: this.props.timetable}))
  }

  
  render() {
    const {places, myPlace, timetables} = this.props;

    const reviews = this.props.reviews.map(review => review = {
      id: review.id,
      user_name: review.user.name,
      user_image: review.user.image_url,
      text: review.text,
      time_created: review.time_created,
      rating: review.rating
    })

    const timetableOptions = timetables.map(timetable => timetable = {
      key: timetable.id,
      text: timetable.name,
      value: timetable.name
    })

    return (
      <React.Fragment>
        <Grid columns='equal'>
          <Grid.Row textAlign='center' className='searchPage' >
            <Grid.Column>
              <h1>Let's search around!</h1>
              <Icon color='purple' name='hand point right outline'/>Tips: For random places, just enter your desired location.
              <SearchForm handleSearch={this.handleSearchList} toggleLoading={this.toggleLoading}/>
              { this.state.loadData &&
                <Loader active inline='centered'/>
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              { places.length > 0 &&
                <React.Fragment>
                  <RenderSearchData handleSearch={this.handleSearchPlace} places={places}/>
                </React.Fragment>
              }
            </Grid.Column>
            <Grid.Column width={8}>
              { !this.state.isLoading &&
                <React.Fragment>
                  <Segment>
                    <RenderSinglePlace place={myPlace} reviews={reviews} />
                  </Segment>
                  <Segment textAlign='center'>
                    {myPlace.isAddedToList ? <Button color='teal' onClick={() => this.handleRemoveFromList(myPlace)}>Added to list</Button> : 
                      <Button color='blue' onClick={this.toggleAddTimetable}>Add to my Timetable</Button>
                    }
                    {this.state.addTimetable && 
                      <AddToTimetable 
                        defaultValue={this.state.timetable} 
                        timetables={timetableOptions} 
                        handleChange={this.getTimetable} 
                        addPlace={this.addPlaceToTimetable} 
                      />
                    }
                  </Segment>
                </React.Fragment>
              }
            </Grid.Column>
            <Grid.Column width={4}>
              {this.state.timetable &&
                <Segment secondary>
                  <Timetable timetable={this.state.timetable} updatePlace={this.updateTimetablePlace} handleDelete={this.handleRemoveFromList}/>
                </Segment>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.mySearch.places,
    myPlace: state.mySearch.singlePlace,
    reviews: state.mySearch.reviews,
    timetables: state.timetables.all,
    timetable: state.timetables.timetable
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    placesSearchQuery: url => dispatch(placesSearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url)),
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url)),
    addToListQuery: (place) => dispatch(addToListQuery(place)),
    removeFromListQuery: place => dispatch(removeFromListQuery(place)),
    getAllTimetables: () => dispatch(getAllTimetables()),
    getSingleTimetable: id => dispatch(getSingleTimetable(id)),
    createNewTimetable: name => dispatch(createNewTimetable(name)),
    updatePlace : (place) => dispatch(updatePlace(place))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);