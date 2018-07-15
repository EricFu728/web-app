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
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      time1: moment().add(4, 'h').format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      time2: moment().add(8, 'h').format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
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
        
      ]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDataGenarate = this.handleDataGenarate.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }
  tick() {
    this.setState(prevState => ({
      now: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
    }));
    if (this.state.status === true) {
      let newData = []
      this.state.outputs.map((item, index) => {
        let newItem = Object.assign({}, this.state.outputs[index])
        if (item.time <= this.state.now && item.active === false) {
          newItem.active = true
        }
        newData.push(newItem)
      })
      this.setState({outputs: newData})
    }
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

  handleDataGenarate = () => {
    const {count, minVol, maxVol, factor, time, time1} = this.state
    let data = []
    let diff = moment(time1).diff(moment(time), 'hours') * factor
    let diffMinutes = _.ceil(diff * 60)
    for(let i = 0; i < count; i++) {
      let item = {
        number: _.ceil(_.random(minVol, maxVol), 2),
        time: moment(_.random(moment(time).valueOf(), moment(time).add(diffMinutes, 'minutes').valueOf())).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
        color: _.random(1,2)%2 ? 'red' : 'green',
        active: false
      }
      data.push(item)
    }
    this.setState({
      outputs: data,
      status: true
    })
  }

  handleReset = () => {
    this.setState({
      outputs: [],
      status: false
    })
  }
  
  handleStop = () => {
    this.setState({status: false})
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
          min="1"
          fluid 
          label='Results' 
          placeholder='1' 
          value={count} 
          name='count'
          onChange={this.handleChange}
        />
          <Button positive size='huge' onClick={this.handleDataGenarate}>Start</Button>
          <Button negative size='huge' onClick={this.handleStop}>Stop</Button>
          <Button size='huge' onClick={this.handleReset} >Reset</Button>
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
          <Card key={index} style= {item.active ? {backgroundColor: 'teal'} : {}}>
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
