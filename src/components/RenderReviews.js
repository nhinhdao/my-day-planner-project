import React, { Component } from 'react';
import {Comment, Header, Rating} from 'semantic-ui-react'

class RenderReviews extends Component {
  render() {
    return (
      <Comment.Group>
        <Header dividing>
          Reviews
        </Header>
        {this.props.reviews.map(review => 
          <Comment key={review.id}>
            { review.user.image_url ? <Comment.Avatar src={review.user.image_url} /> : <Comment.Avatar src='https://i.imgur.com/MhN5kCx.jpg' />}
            <Comment.Content>
              <Comment.Author as='a'>{review.user.name}</Comment.Author>
              <Comment.Metadata>
                <div>{review.time_created.split(" ")[0]}</div>
              </Comment.Metadata>
              <Comment.Text>{review.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Rating: <Rating icon='star' defaultRating={parseInt(review.rating)} maxRating={5} size='mini' disabled/></Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        )}
      </Comment.Group>
    )
  }
}

export default RenderReviews;