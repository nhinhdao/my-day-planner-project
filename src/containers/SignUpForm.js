import React, { Component } from 'react';
import {Form, Header, Segment} from 'semantic-ui-react';
import {register} from '../actions/APIsearch';
import {connect} from 'react-redux'

class SignUpForm extends Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: { username: '', email: '', password: '', password_confirmation: ''},
      error: ''
    }
  }

  handleChange = (event) => {
    this.setState({ 
      ...this.state, 
      user: {
        ...this.state.user, 
        [event.target.name]: event.target.value
      } 
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.user.password !== this.state.user.password_confirmation) {
      this.setState({error: 'Sorry! Passwords do not match.'})
    } 
    else {
      this.props.register(this.state.user)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Segment basic>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input icon="user" iconPosition="left" placeholder="Username"
                onChange={this.handleChange} name='username' value={this.state.username} required />
              <Form.Input icon="envelope" iconPosition="left" placeholder="Email"
                onChange={this.handleChange} name='email' value={this.state.email} required />
              <Form.Input icon="lock" iconPosition="left" placeholder="Password" type="password"
                onChange={this.handleChange} name='password' value={this.state.password} required />
              <Form.Input icon="lock" iconPosition="left" placeholder="Password Confirmation" type="password"
                onChange={this.handleChange} name='password_confirmation' value={this.state.password_confirmation} required />
              <Form.Button type='submit' color="blue" fluid size="medium">Register</Form.Button>
            </Form.Group>
          </Form>
          {this.state.error &&
            <Header as='h3' color='red'>{this.state.error}</Header>
          }
        </Segment>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm);