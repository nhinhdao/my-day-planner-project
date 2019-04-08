import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import RenderReviews from './RenderReviews';
import { Segment, List, Header, Rating } from 'semantic-ui-react'

class RenderSinglePlace extends Component {
  state = { place: {}, reviews: []}

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
        
      </Segment>
    )
  }
}
        
export default RenderSinglePlace;