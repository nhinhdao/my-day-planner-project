const options = savedPlaces.map(place => place = {key: place.id, description: place.category, text: place.name, value: place.id});

<Grid columns={2} divided>
  <Grid.Row stretched>
    <Grid.Column>
      <Segment>
        <RenderSearchData handleSearch={this.getPlace} places={savedPlaces}/>
        <Dropdown
          button
          className='icon'
          floating
          labeled
          icon='location arrow'
          options={options}
          search
          onChange={this.handleChange}
          text='Saved Places'
        />
        {this.state.place &&
          <RenderSinglePlace place={this.state.place} reviews={this.state.place.reviews} />
        }
        <Link to='/search'><Button size='mini' color='blue'>Continue Searching</Button></Link>
        <Link to='/go'><Button size='mini' color='blue'>Add to my Timetable</Button></Link>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      {project &&
        <Segment secondary>
          
        </Segment>
      }
    </Grid.Column>
  </Grid.Row>
</Grid>

date.strftime('%FT%R')