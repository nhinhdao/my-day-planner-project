import React, { Component } from 'react';
import {List, Header, Segment} from 'semantic-ui-react';

class RenderSearchData extends Component {
  handleClick = (id) => {
    this.props.handleSearch(id);
  }

  render() {
    const { places } = this.props;
    return (
      <Segment>
        <List divided animated verticalAlign='middle'>
          {places.map(place => 
            <List.Item key={place.id} onClick={() => this.handleClick(place.id)}>
              {place.isAddedToList ? <List.Icon name='heart' color='pink' verticalAlign='middle' /> : <List.Icon name='heart outline' verticalAlign='middle' />}
              <List.Content>
                <Header as='h4' color='blue'>{place.category}</Header>
                <List.Description>{place.name}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </Segment>
    )
  }
}

export default RenderSearchData;