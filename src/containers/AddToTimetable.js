import React, { Component } from 'react';
import {Dropdown, Label, Icon} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddToTimeTable extends Component {
  constructor(props){
    super(props);
    this.state = { 
      options: props.timetables,
      time: new Date()
    };
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleAddition = this.handleAddition.bind(this)
  }

  async handleAddition(e, { value }){
    await this.setState({
      options: [{ key: value, text: value, value }, ...this.state.options],
    });
    this.props.handleChange(value)
  }

  handleChange = (e, { value }) => {
    this.props.handleChange(value)
  }

  handleChangeTime(date) {
    this.setState({
      time: date
    });
  }

  handleAddPlace = () => {
    this.props.addPlace(this.state.time)
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          options={this.state.options}
          placeholder='Choose or create a timetable'
          search
          selection
          floating
          allowAdditions
          additionLabel={<span style={{ color: 'red' }}>Add:  </span>}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
          defaultValue={this.props.defaultValue ? this.props.defaultValue.name : null}
        />
        <DatePicker
            selected={this.state.time}
            onChange={this.handleChangeTime}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time"
        />
        <Label onClick={this.handleAddPlace} color='red'><Icon name="plus"/>Add</Label>
      </React.Fragment>
    )
  }
}

export default AddToTimeTable;