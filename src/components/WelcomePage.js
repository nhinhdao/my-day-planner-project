import React, { Component } from 'react';
import LogInForm from '../containers/LogInForm';
import SignUpForm from '../containers/SignUpForm';
import {Button, Image, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import logo_mtp from '../images/logo_mtp.jpg';
// import banner from '../images/banner.jpg';

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

  renderError(){
    if (this.props.error){
      return 'Incorrect Username/Password';
    }
  }

  render() {
    if (localStorage.getItem("userID")) {
      return <Redirect to='/'/>;
    }
    return (
      <div className='App-body'>
        <Grid centered  id='form-login'>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image centered src={logo_mtp}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Button.Group>
            <Button color='teal' onClick={this.toggleLogIn}>Log In</Button>
            <Button.Or />
            <Button color='orange' onClick={this.toggleRegister}>Sign Up</Button>
          </Button.Group>
          </Grid.Row>
          <Grid.Row>
            {this.state.logIn && <LogInForm /> }{this.state.register && <SignUpForm />}
          </Grid.Row>
          <Grid.Row>
            <div id='formErrors'><Header as='h3' color='red' textAlign='center'>{this.renderError()}</Header></div>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.currentUser.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetError: () => dispatch({type: 'RESET_ERROR'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
