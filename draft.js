
<List animated verticalAlign='middle'>
  <List.Item>
    <List.Icon name='star outline' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>Aquarium</List.Header>
      <List.Description as='a'>West New York Aquarium</List.Description>
    </List.Content>
  </List.Item>
</List>

import { Tab, Header, Icon, List } from 'semantic-ui-react'

const panes = [
  {},
  { menuItem: (
    <List.Item>
        <List.Content>
          <Header as='h4' color='blue'><Icon name='heart' color='pink'/>Museum</Header>
          <List.Description>Central Park, New York</List.Description>
        </List.Content>
      </List.Item>
    ) },
  { menuItem: (
    <List.Item>
        <List.Content>
          <Header as='h4' color='blue'><Icon name='heart' color='pink'/>Museum</Header>
          <List.Description>Central Park, New York</List.Description>
        </List.Content>
      </List.Item>
    ) },
  { menuItem: (
    <List.Item>
        <List.Content>
          <Header as='h4' color='blue'><Icon name='heart' color='pink'/>Museum</Header>
          <List.Description>Central Park, New York</List.Description>
        </List.Content>
      </List.Item>
    ) },
]

const TabExampleVerticalTabular = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

const panes = [];
this.props.places.forEach(place => {
  panes.push({menuItem: (
  <List.Item onClick={() => this.handleClick(place.id)}>
    <List.Content>
      <Header as='h4' color='blue'>{place.isAddedToList ? <Icon name='heart' color='pink'/> : <Icon name='heart outline'/>}{place.category}</Header>
      <List.Description>{place.name}</List.Description>
    </List.Content>
  </List.Item>
  )})
});
return (
<Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={panes} />
)