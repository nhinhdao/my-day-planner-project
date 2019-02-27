import React, { Component } from 'react';

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

  handleSubmmit = event => {
    event.preventDefault();
    this.search();
    this.setState({searchQuery: '', location: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmmit}>
          <label>Enter your search query:</label>
          <input type='text' onChange={this.handleChange} name='searchQuery' value={this.state.searchQuery} placeholder='Ice cream or museum...'></input><br />
          <label>Enter your location or zipcode:</label>
          <input type='text' onChange={this.handleChange} name='location' value={this.state.location} placeholder='Newyork or 10065...'></input><br />
          <button type='submit'>Search</button>
        </form>
      </div>
    )
  }
}

export default SearchForm;