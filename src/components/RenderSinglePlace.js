import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { reviewSearchQuery, addToListQuery, removeFromListQuery } from '../actions/APIsearch';
import { connect } from 'react-redux';
import RenderReviews from './RenderReviews';
import { Segment, List, Header, Button, Rating } from 'semantic-ui-react'

class RenderSinglePlace extends Component {
  state = { place: {}, reviews: []}

  handleAddFavorite = (id) => {
    this.props.addToListQuery(id);
  }

  handleRemoveFromList = id => {
    this.props.removeFromListQuery(id)
  }

  render() {
    const { place, reviews } = this.props;
    const imageList = place.photos ?
      <Carousel showThumbs={false} infiniteLoop={true}>
        {place.photos.map((photo, index) =>
          <div key={index} className="side-crop" ><img src={photo} alt={place.name}/></div>)}
      </Carousel> : "No Images Available";
    
    return (
      <Segment>
        <div className='carouselImages'>
        <Header>{place.name}</Header>
        {imageList}
        </div>
          <List>
            <List.Item>
              <List.Icon name='heart' />
              <List.Content><Rating icon='star' defaultRating={parseInt(place.rating)} maxRating={5} size='small' disabled/></List.Content>
            </List.Item>
            <List.Item icon='map signs' content={place.location} />
            <List.Item icon='phone' content={place.contact} />
          </List>
        <RenderReviews reviews={reviews} />
        {place.isAddedToList ? <Button size='mini' color='teal' onClick={() => this.handleRemoveFromList(place.id)}>Remove from my list</Button> : 
            <Button size='mini' color='teal' onClick={() => this.handleAddFavorite(place.id, reviews)}>Add to my favorite list</Button>
          }
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    myList: state.myList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url)),
    addToListQuery: id => dispatch(addToListQuery(id)),
    removeFromListQuery: id => dispatch(removeFromListQuery(id))
  }
}
        
export default connect(mapStateToProps, mapDispatchToProps)(RenderSinglePlace);