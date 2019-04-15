import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { Popup, Rating, Image, Icon, Label, List} from 'semantic-ui-react';
import { removeFromListQuery } from '../actions/APIsearch';

class TimelineItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      time: new Date(props.date),
    };
    this.handleUpdatePlace = this.handleUpdatePlace.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this)
  }
  
  handleChangeTime(date) {
    this.setState({
      time: date
    });
  }

  handleUpdatePlace = () => {
    // debugger
    let place = {id: this.props.place.id, timetable_id: this.props.timetableID, time: this.state.time};
    this.props.updatePlace(place)
  }

  handleRemoveFromList = place => {
    this.props.removeFromListQuery(place)
  }

  render() {
    const {time, text, place} = this.props
    return (
      <li>
        <i className="fa" />
        <div className="time-line-item">
          <span className="time">
            <i className="fa fa-clock-o" /> {time}{" | "}
            <Popup
            trigger={<Icon name='edit' color='blue' />}
            content={
              <div>
                <DatePicker
                selected={this.state.time}
                onChange={this.handleChangeTime}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                />{" "}
                <Label onClick={this.handleUpdatePlace} color='teal' size='tiny'>Update Time Change</Label>
              </div>
            }
            on='click'
            position='top right'
            wide='very'
          />{"|"}<Icon name='delete' color='red' onClick={() => this.props.handleDelete(place)}/>
          </span>
          <div className="time-line-header">
            <Popup
              trigger={<span>{text}</span>}
              content={
                <React.Fragment>
                  <Popup.Header>{place.name}</Popup.Header>
                  <Popup.Content>
                    <Image src={place.photos[0]} />
                    <List>
                      <List.Item>
                        <List.Icon name='heart' />
                        <List.Content><Rating icon='star' defaultRating={parseInt(place.rating)} maxRating={5} size='small' disabled/></List.Content>
                      </List.Item>
                      <List.Item icon='map signs' content={place.location} />
                      <List.Item icon='phone' content={place.contact} />
                    </List>
                  </Popup.Content>
                </React.Fragment>
              }
              on='click'
              position='bottom right'
            />
          </div>
        </div>
      </li>
    )
  };
}

TimelineItem.defaultProps = {};

TimelineItem.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromListQuery: place => dispatch(removeFromListQuery(place))
  }
}

export default connect(null, mapDispatchToProps)(TimelineItem);
// export default TimelineItem;
