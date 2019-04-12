import React, { Component } from 'react'
import {Container, Grid, Segment, Header, Label, Button, Form, Image, Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {updateUserAccount, getCurrentUser } from '../actions/APIsearch';


class MyPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: ''
      },
      updateAccount: false,
      errors: false
    };
    this.handleClick=this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateInformation = this.handleUpdateInformation.bind(this)
  }

  componentDidMount(){
    const {user} = this.props;
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        username: user.username,
        email: user.email,
        image: user.image
      }
    });
    this.baseState = {
      user: {
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        image: user.image,
      },
      updateAccount: false,
      errors: false
    };
  }

  handleCancel(){
    this.setState(this.baseState)
  }

  handleClick(){
    this.setState({updateAccount: true, errors: false})
  }

  handleUpdateInformation(event){
    const {name, value} = event.target
    if (value !== ''){this.setState({...this.state, user:{...this.state.user, [name]: value}})}
  }


  handleSubmit(event){
    event.preventDefault();
    if (this.state.user.password && this.state.user.password === this.state.user.password_confirmation) {
      this.props.updateUserAccount(this.state.user)
      this.setState({...this.state, updateAccount: false, errors: false})
    }
    else {this.setState({errors : true})}
  }

  render() {
    const {user} = this.state;
    return (
      <Container text>
      <Segment>
        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment raised>
                <Header as='h1' color='blue'>My Page</Header>
                <hr/>
                <Label color='red' ribbon>Overview</Label>
                <span>Account Details</span>
                <Image src={this.props.user.image}/>
                <Segment color='blue'>
                  <Header as='h4' color='blue'>{this.props.user.username}</Header>
                  <p><strong>{this.props.user.email}</strong></p>
                </Segment>
                <Button onClick={this.handleClick}>Update Account</Button>
              </Segment>
            </Grid.Column>
          { this.state.updateAccount &&
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <hr/>
                <Form.Group widths='equal'>
                  <Form.Input label='Username' name='username' value={user.username} placeholder={this.props.user.username} onChange={this.handleUpdateInformation} />
                  <Form.Input label='Email' name='email' value={user.email} placeholder={this.props.user.email} onChange={this.handleUpdateInformation} />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Password' type='password' name='password' placeholder='Password' value={user.password} onChange={this.handleUpdateInformation} required/>
                  <Form.Input label='Password Confirmation' type='password' name='password_confirmation' value={user.password_confirmation} placeholder='Password Confirmation' onChange={this.handleUpdateInformation} required/>
                </Form.Group>
                {this.state.errors && <Header as='h5' color='red'>Passwords do not match/present. Please try again!</Header>}
                <Form.Input label='Link to your profile picture' name='image' placeholder='Picture of size 200x200 if possible' onChange={this.handleUpdateInformation}/>
                <Button type='submit' color='blue'>Update</Button><Button type='button' onClick={this.handleCancel}>Cancel</Button>
              </Form>
            </Grid.Column>
          }
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment >
              <Header as='h1' color='blue'>Timetables</Header>
              <hr/><br/>
              <Card.Group>
                <Card>
                  <Card.Content
                    header='Elliot Baker'
                    meta='Friend'
                  />
                </Card>
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>
    </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.current_user.user
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: id => dispatch(getCurrentUser(id)),
    updateUserAccount: user => dispatch(updateUserAccount(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
