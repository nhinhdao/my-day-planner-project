import React, { Component } from 'react';
import { Segment, Form, Label, Input } from 'semantic-ui-react';

class SearchForm extends Component {
  constructor () {
    super();
    this.state = {
      searchQuery: '',
      location: ''
    }
  }

  search() {
    let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${this.state.searchQuery}&location=${this.state.location}&limit=20`;
    this.props.handleSearch(url);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.toggleLoading();
    this.search();
    this.setState({searchQuery: '', location: ''})
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Segment.Group horizontal>
              <Segment>
              <Label color='teal' pointing='right'>Enter query</Label>
              <Input size='mini' type='text' onChange={this.handleChange} name='searchQuery' value={this.state.searchQuery} placeholder='Ice cream or museum...'/>
              </Segment>
              <Segment>
              <Label color='teal' pointing='right'>Enter location</Label>
              <Input size='mini' type='text' onChange={this.handleChange} name='location' value={this.state.location} placeholder='Newyork or 10065...' />
              </Segment>
              <Segment>
              <Form.Button  size='mini' color='blue'>Search</Form.Button>
              </Segment>
            </Segment.Group>
          </Form.Group>
      </Form>
    )
  }
}

export default SearchForm;