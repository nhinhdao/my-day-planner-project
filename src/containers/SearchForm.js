import React, { Component } from 'react';
import { Segment, Form, Label, Input, Message } from 'semantic-ui-react';

class SearchForm extends Component {
  constructor () {
    super();
    this.state = {
      searchQuery: '',
      location: '',
      error: ''
    };
    this.search = this.search.bind(this)
  }

  async search() {
    if(this.state.location){
      let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${this.state.searchQuery}&location=${this.state.location}&limit=20`;
      await this.setState({error: ''});
      this.props.handleSearch(url);
    }
    else {
      this.setState({error: 'Please enter location!'})
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.toggleLoading();
    this.search();
    this.setState({searchQuery: ''})
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Segment.Group horizontal>
              <Segment>
                <Form.Field inline>
                  <Label color='teal' pointing='right'>Enter query</Label>
                  <Input size='mini' type='text' onChange={this.handleChange} name='searchQuery' value={this.state.searchQuery} placeholder='Ice cream or museum...'/>
                </Form.Field>
              </Segment>
              <Segment>
                <Form.Field inline required>
                  <Label color='teal' pointing='right'>Enter location</Label>
                  <Input size='mini' type='text' onChange={this.handleChange} name='location' value={this.state.location} placeholder='Newyork or 10065...' />
                </Form.Field>
              </Segment>
              <Segment>
                <Form.Button  size='mini' color='blue'>Search</Form.Button>
              </Segment>
            </Segment.Group>
          </Form.Group>
          {this.state.error &&
            <Message color='red' compact>{this.state.error}</Message>
          }
      </Form>
    )
  }
}

export default SearchForm;