import React, { Component } from 'react';
import LogInForm from '../containers/LogInForm';
import SignUpForm from '../containers/SignUpForm';
import {Button, Image, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';

class WelcomePage extends Component {
  state = {
    logIn: false,
    register: false
  }

  toggleLogIn = () => {
    this.setState({logIn: true, register: false})
  }

  toggleRegister = () => {
    this.props.resetError();
    this.setState({logIn: false, register: true})
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row></Grid.Row><Grid.Row></Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Image centered src='https://i.imgur.com/zGMl4ot.png'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Header as='h4'>Let's get started!</Header>
        <Button.Group>
          <Button color='teal' onClick={this.toggleLogIn}>Log In</Button>
          <Button.Or />
          <Button color='orange' onClick={this.toggleRegister}>Sign Up</Button>
        </Button.Group>
        </Grid.Row>
        <Grid.Row>
          {this.state.logIn && <LogInForm /> }{this.state.register && <SignUpForm />}
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetError: () => dispatch({type: 'RESET_ERROR'})
  }
}
export default connect(null, mapDispatchToProps)(WelcomePage);
