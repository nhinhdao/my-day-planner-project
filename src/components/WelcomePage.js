import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Image, Grid, Label, Divider, Form, Icon, Input, List} from 'semantic-ui-react';

class WelcomePage extends Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Row></Grid.Row><Grid.Row></Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Image centered src='https://bulma.io/images/extensions/bulma-steps-alternative.png'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form>
              <Form.Field inline>
                <Label pointing='right'>1. Enter query</Label>
                <Button basic size='mini'>Museum or food, ...</Button>
              </Form.Field>
              <Divider />

              <Form.Field inline>
                <Label pointing='right'>2. Enter location</Label>
                <Button basic size='mini'>New York or 10065</Button>
              </Form.Field>
              <Divider />

              <Form.Field inline>
                <Label pointing='right'>3. Press SEARCH button</Label>
                <Button color='blue' size='mini'>Search</Button>
              </Form.Field>
              <Divider />

              <Form.Field inline>
                <Label pointing='right'>4. Add places to favorite list</Label>
                <Input><Icon color='yellow' name='star' /> Best Pizza in town</Input>
              </Form.Field>
              <Divider />

              <Form.Field inline>
                <Label pointing='right'>5. Add favorite places to timetable</Label>
                <List horizontal>
                  <List.Item>
                    <Image avatar src='https://picturecorrect-wpengine.netdna-ssl.com/wp-content/uploads/2012/12/central-park-timelapse-200x200.jpg' />
                    <List.Content>
                      <List.Header>11:00 am</List.Header>
                      Central Park, New York
                    </List.Content>
                  </List.Item>
                </List>
              </Form.Field>
              <Divider />

              <Form.Field inline>
                <h4>
                  Ready ? <Icon color='grey' name='arrow right' /> <Link to='/search'><Button color='teal' size='small'>Let's get started!</Button></Link>
                </h4>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default WelcomePage;
