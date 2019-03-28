import React, { Component } from 'react';
import logo from '../logo.svg';
import { mySearchQuery, singleSearchQuery, reviewSearchQuery } from '../actions/APIsearch';
import RenderSinglePlace from './RenderSinglePlace';
import {Link} from 'react-router-dom';
import RenderSearchData from './RenderSearchData';
import {Grid, Container, Button} from 'semantic-ui-react';

import { connect } from 'react-redux';

class MySavedPlaces extends Component {
  state = { place: null}

  getPlace = (id) => {
    let place = this.props.places.find(place => place.id === id);
    this.setState({place: place})
  }
  
  render() {
    const {places} = this.props;
    return (
      <React.Fragment>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span> My Favorite Places! </span>
          </header>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <RenderSearchData handleSearch={this.getPlace} places={places}/>
                </Grid.Column>
                <Grid.Column width={12}>
                  {this.state.place &&
                    <React.Fragment>
                      <RenderSinglePlace place={this.state.place} reviews={this.state.place.reviews} />
                      <Link to='/search'><Button size='mini' color='blue'>Continue Searching</Button></Link>
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
    places: state.myList
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    mySearchQuery: url => dispatch(mySearchQuery(url)),
    singleSearchQuery: url => dispatch(singleSearchQuery(url)),
    reviewSearchQuery: url => dispatch(reviewSearchQuery(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySavedPlaces);