import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { reviewSearchQuery, addToListQuery, removeFromListQuery } from '../actions/APIsearch';
import { connect } from 'react-redux';
import RenderReviews from './RenderReviews';

class RenderSinglePlace extends Component {
  state = { isReviewClicked: false }
  
  handleReviews = (id) => {
    let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;
    this.setState({isReviewClicked: true})
    this.props.reviewSearchQuery(url);
  }

  handleAddFavorite = (id) => {
    this.props.addToListQuery(id);
  }

  handleRemoveFromList = id => {
    this.props.removeFromListQuery(id)
  }

  render() {
    const { myPlace } = this.props;
    console.log(myPlace.isAddedToList);
    const imageList = myPlace.photos ?
      <Carousel showThumbs={false} infiniteLoop={true}>
        {myPlace.photos.map((photo, index) =>
          <div key={index} className="side-crop" ><img src={photo} alt={myPlace.name}/></div>)}
      </Carousel> : "No Images Available";
    
    return (
      <div>
        <h3>{myPlace.name}</h3>
        {imageList}
        <p>Rating: {myPlace.rating}</p>
        <p>Category: {myPlace.category}</p>
        <p>Location: {myPlace.location}</p>
        <p>Contact: {myPlace.contact}</p>
        <button onClick={() => this.handleReviews(myPlace.id)}>View reviews</button>
        {this.state.isReviewClicked ? <RenderReviews reviews={this.props.reviews} /> : null}
        {myPlace.isAddedToList ? <button onClick={() => this.handleRemoveFromList(myPlace.id)}>Remove from my list</button> : <button onClick={() => this.handleAddFavorite(myPlace.id)}>Add to my favorite list</button>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviewsSearch.reviews,
    myList: state.mySearch.myList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url)),
    addToListQuery: place => dispatch(addToListQuery(place)),
    removeFromListQuery: place => dispatch(removeFromListQuery(place))
  }
}
        
export default connect(mapStateToProps, mapDispatchToProps)(RenderSinglePlace);