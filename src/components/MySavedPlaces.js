import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import RenderSinglePlace from './RenderSinglePlace';
import {Grid, Container, Button, Segment, Dropdown, Header} from 'semantic-ui-react';
import { getSavedPlaces, getSingleTimetable} from '../actions/APIsearch';
import { connect } from 'react-redux';


class MySavedPlaces extends Component {
  constructor(){
    super();
    this.state = {
      place: null
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.getSavedPlaces()
  }
  
  handleChange = (e, {value}) => {
    let place = this.props.savedPlaces.find(place => place.id === value);
    this.setState({place: place})
  }

  render() {
    const {savedPlaces} = this.props;

    const options = savedPlaces.map(place => place = {
      key: place.id,
      text: place.category,
      value: place.id,
      content: <Header as='h4' content={place.name} subheader={place.category} />,
    });

    if (savedPlaces.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span> My Favorite Places! </span>
        </header>
        <Container>
          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <Dropdown fluid options={options} search selection onChange={this.handleChange} placeholder='Saved Places'/>
                  {this.state.place &&
                    <RenderSinglePlace place={this.state.place} reviews={this.state.place.reviews} />
                  }
                  <Link to='/search'><Button size='mini' color='blue'>Continue Searching</Button></Link>
                  <Link to='/go'><Button size='mini' color='blue'>Add to my Timetable</Button></Link>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.place &&
                  <Segment secondary>
          
                  </Segment>
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
    savedPlaces: state.mySearch.myList
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    getSavedPlaces:() => dispatch(getSavedPlaces()),
    getSingleTimetable: id => dispatch(getSingleTimetable(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySavedPlaces);