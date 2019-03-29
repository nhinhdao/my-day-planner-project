import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import RenderSearchData from './RenderSearchData';
import RenderSinglePlace from './RenderSinglePlace';
import {Grid, Container, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { mySearchQuery, singleSearchQuery, reviewSearchQuery } from '../actions/APIsearch';


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
                <React.Fragment>
                  <RenderSearchData handleSearch={this.getPlace} places={places}/>
                  <Link to='/search'><Button size='mini' color='blue'>Continue Searching</Button></Link>
                  <Link to='/search'><Button size='mini' color='blue'>Add to my Timetable</Button></Link>
                </React.Fragment>
              </Grid.Column>
              <Grid.Column width={12}>
                {this.state.place &&
                  <RenderSinglePlace place={this.state.place} reviews={this.state.place.reviews} />
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