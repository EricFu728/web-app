import React, { Component } from 'react';
import {
  Container, 
  Segment, 
  Grid, 
  Form, 
  Header, 
  Button, 
  Label,
  Card
} from 'semantic-ui-react'
import moment from 'moment'
import {CSVLink} from 'react-csv'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      time1: moment().add(6, 'h').format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      time2: moment().add(12, 'h').format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      now: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      factor: 1,
      minVol: 0.01,
      maxVol: 1,
      target: 0.01,
      loss: 1,
      take: 5,
      count: 6,
      status: false,
      outputs:[
        {
          number: '0.6',
          time: '2018/06/01 08:09:21.876',
          color: 'red'
        },
        {
          number: '0.87',
          time: '2018/11/07 04:54:53.441',
          color: 'green'
        },
        {
          number: '0.65',
          time: '2018/03/21 18:23:22.346',
          color: 'red'
        },
        {
          number: '0.6',
          time: '2018/06/01 08:09:21.876',
          color: 'red'
        },
        {
          number: '0.87',
          time: '2018/11/07 04:54:53.441',
          color: 'green'
        },
        {
          number: '0.65',
          time: '2018/03/21 18:23:22.346',
          color: 'red'
        },
        {
          number: '0.6',
          time: '2018/06/01 08:09:21.876',
          color: 'red'
        },
        {
          number: '0.87',
          time: '2018/11/07 04:54:53.441',
          color: 'green'
        },
        {
          number: '0.65',
          time: '2018/03/21 18:23:22.346',
          color: 'red'
        },
        {
          number: '0.6',
          time: '2018/06/01 08:09:21.876',
          color: 'red'
        },
        {
          number: '0.87',
          time: '2018/11/07 04:54:53.441',
          color: 'green'
        },
        {
          number: '0.65',
          time: '2018/03/21 18:23:22.346',
          color: 'red'
        },
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  tick() {
    this.setState(prevState => ({
      now: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  renderTimeSetting() {
    const {time1, time2, time, factor} = this.state
    return (
      <Segment>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Input type='datetime-local' step="0.001"  fluid label='Start' placeholder='Start' value={time} name='time' onChange={this.handleChange}/>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Input type='datetime-local' step="0.001"  fluid label='1st' placeholder='1st' value={time1} name='time1' onChange={this.handleChange}/>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Input type='datetime-local' step="0.001"  fluid label='2nd' placeholder='2nd' value={time2} name='time2' onChange={this.handleChange}/>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
            <Form>
                  <Form.Input type='number' step="1"  fluid label='Random time factor' placeholder='1' value={factor} name='factor' onChange={this.handleChange}/>
                </Form>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    )
  }

  renderSettings() {
    const {minVol, maxVol, target, loss, take} = this.state
    return (
      <Segment>
      <Header as='h3'>Input</Header>
      <Form>
          <Form.Input type='number' step="0.01"  fluid label='Min Vol' placeholder='0.01' value={minVol} name='minVol' onChange={this.handleChange}/>
          <Form.Input type='number' step="0.01"  fluid label='Max Vol' placeholder='1' value={maxVol} name='maxVol' onChange={this.handleChange}/>
          <Form.Input type='number' step="0.01"  fluid label='Target +' placeholder='0.01' value={target} name='target' onChange={this.handleChange}/>
          <Form.Input type='number' step="0.01"  fluid label='Stop Loss -' placeholder='10' value={loss} name='loss' onChange={this.handleChange}/>
          <Form.Input type='text' fluid label='Take' placeholder='5' value={take} icon='percent' name='take' onChange={this.handleChange}/>
      </Form>
      </Segment>
    )
  }

  renderAction() {
    const {count, status, now} = this.state
    return (
      <Segment padded>
      <Label color={status ? 'green' : 'red'} attached='top right'>
        {status ? 'Running' : 'Stopped'}
      </Label>
      <Form>
        <Form.Input 
          type='datetime-local' 
          step="0.001"  
          fluid 
          label='System Time' 
          value={now} 
          name='now'
        />
        <Form.Input 
          type='number'
          step="1"  
          fluid 
          label='Results' 
          placeholder='0.01' 
          value={count} 
          name='count'
          onChange={this.handleChange}
        />
          <Button positive size='huge'>Start</Button>
          <Button negative size='huge'>Stop</Button>
          <Button size='huge'>Reset</Button>
      </Form>

      </Segment>
    )
  }

  renderOutput() {
    const {outputs} = this.state
    return (
      <Segment>
      <Card.Group itemsPerRow={4}>
        {outputs.map((item, index) => (
          <Card key={index}>
            <Card.Content>
            <Card.Header>
              <Label color={item.color} ribbon='right'>
                &nbsp;
              </Label>
              <Header>{item.number}</Header>
            </Card.Header>
            <Card.Meta>{item.time}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      </Segment>
    )
  }

  render() {
    const csvData = this.state.outputs.map((item, key) => {
      return [item.number, item.time, item.color]
    })
    return (
      <Container style={{marginTop: '50px', marginBottom: '50px'}}>
      <CSVLink data={csvData} >Download data</CSVLink>
        {this.renderTimeSetting()}
          <Grid columns={2}>
            <Grid.Column>
            {this.renderSettings()}
            </Grid.Column>
            <Grid.Column>
              {this.renderAction()}
            </Grid.Column>
          </Grid>
        {this.renderOutput()}
      </Container>
    );
  }
}

export default App;
