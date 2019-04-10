import React, { Component } from 'react';
import {Dropdown, Label, Icon, Segment} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddToTimeTable extends Component {
  constructor(props){
    super(props);
    this.state = { 
      options: props.timetables,
      timetable: {
        name: '',
        time: new Date()
      },
    };
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleAddition = this.handleAddition.bind(this)
  }

  async handleAddition(e, { value }){
    await this.setState({
      ...this.state,
      options: [{ key: value, text: value, value }, ...this.state.options],
    });
    this.props.handleChange(value)
  }

  handleChange = (e, { value }) => {
    this.props.handleChange(value)
  }

  handleChangeTime(date) {
    debugger
    this.setState({
      ...this.state,
      timetable: {
        ...this.state.timetable,
        time: date
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <Segment basic>
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
        />
        <DatePicker
            selected={this.state.timetable.time}
            onChange={this.handleChangeTime}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time"
        />
        <Label onClick={this.handleAddTask} color='red' tag><Icon name="plus"/>Add</Label>
      </Segment>
    )
  }
}

export default AddToTimeTable;