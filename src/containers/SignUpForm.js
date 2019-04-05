import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';
import {register} from '../actions/APIsearch';
import {connect} from 'react-redux'

class SignUpForm extends Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.register(this.state)
  }

  render() {
    return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input icon="user" iconPosition="left" placeholder="Username"
                onChange={this.handleChange} name='username' value={this.state.username} required />
              <Form.Input icon="lock" iconPosition="left" placeholder="Password" type="password"
                onChange={this.handleChange} name='password' value={this.state.password} required />
              <Form.Input icon="lock" iconPosition="left" placeholder="Password Confirmation" type="password"
                onChange={this.handleChange} name='password_confirmation' value={this.state.password_confirmation} required />
              <Form.Button type='submit' color="blue" fluid size="large">Register</Form.Button>
            </Form.Group>
          </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm);