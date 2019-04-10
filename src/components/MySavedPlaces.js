import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import RenderSinglePlace from './RenderSinglePlace';
import {Grid, Container, Button, Segment, Dropdown, Header} from 'semantic-ui-react';
import { getSavedPlaces, getSingleTimetable, getAllTimetables, createNewTimetable} from '../actions/APIsearch';
import { connect } from 'react-redux';
import AddToTimetable from '../containers/AddToTimetable';
import Timetable from './Timetable';


class MySavedPlaces extends Component {
  constructor(){
    super();
    this.state = {
      place: null,
      addTimetable: false,
      timetable: null
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.getSavedPlaces();
    this.props.getAllTimetables();
  }
  
  handleChange = (e, {value}) => {
    let place = this.props.savedPlaces.find(place => place.id === value);
    this.setState({place: place})
  }

  getTimetable = name => {
    let timetable = this.props.timetables.find(timetable => timetable.name === name);
    if (timetable){
      this.setState({timetable: timetable})
    }
    else {
      this.props.createNewTimetable(name).then(() => this.setState({timetable: this.props.timetable}))
    }
  }

  toggleAddTimetable = () => {
    this.setState({addTimetable: true})
  }

  addPlaceToTimetable = () => {

  }

  render() {
    const {savedPlaces, timetables} = this.props;
    const {place} = this.state;

    const placeOptions = savedPlaces.map(place => place = {
      key: place.id,
      text: place.category,
      value: place.id,
      content: <Header as='h4' content={place.name} subheader={place.category} />,
    });

    const timetableOptions = timetables.map(timetable => timetable = {
      key: timetable.name,
      text: timetable.name,
      value: timetable.name
    })

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
              <Grid.Column width={10}>
                <Segment>
                  <Dropdown fluid options={placeOptions} search selection onChange={this.handleChange} placeholder='Saved Places'/>
                  {place &&
                    <React.Fragment>
                      <RenderSinglePlace place={place} reviews={place.reviews} />
                      <Button size='mini' color='teal' onClick={() => this.handleRemoveFromList(place)}>Remove from my list</Button>
                      <Link to='/search'><Button size='mini' color='blue'>Continue Searching</Button></Link>
                      <Button size='mini' color='blue' onClick={this.toggleAddTimetable}>Add to my Timetable</Button>
                      {this.state.addTimetable && 
                        <AddToTimetable timetables={timetableOptions} handleChange={this.getTimetable}/>
                      }
                    </React.Fragment>
                  }
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                {this.state.timetable &&
                  <Segment secondary>
                    <Timetable timetable={this.state.timetable}/>
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
    savedPlaces: state.mySearch.myList,
    timetables: state.timetables.all,
    timetable: state.timetables.timetable
  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    getSavedPlaces:() => dispatch(getSavedPlaces()),
    getAllTimetables: () => dispatch(getAllTimetables()),
    getSingleTimetable: id => dispatch(getSingleTimetable(id)),
    createNewTimetable: name => dispatch(createNewTimetable(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySavedPlaces);