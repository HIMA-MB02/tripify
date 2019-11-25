import React, { Component } from 'react';
import { Icon, Segment, Grid, Select, Container, Option } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import './flight-list.component.css';
import axios from 'axios';
import NavBar from '../navbar.component';
import NumberFormat from 'react-number-format';

class Train extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      departureTime: this.props.train.departureDate.slice(11, 16),
      durationTime: {
        hours: `0${this.props.train.duration}`,
        minutes: '00'
      },
      arrivalTime: `0${parseInt(this.props.train.departureDate.slice(11, 13)) + this.props.train.duration}:00`
    }
    this.bookNow = this.bookNow.bind(this);
  }

  bookNow() {
    let trainDetails = {
      cityFrom: this.props.train.cityFrom,
      cityTo: this.props.train.cityTo,
      departureDate: this.props.train.departureDate,
      trainName: this.props.train.trainName,
      trainNumber: this.props.train.trainNumber,
      departureTime: this.state.departureTime,
      duration: this.state.durationTime,
      arrivalTime: this.state.arrivalTime,
      seatPrice: this.props.train.seatPrice,
      travellersCount: this.props.travellersCount
    }
    this.props.history.push({
      pathname: '/train-booking',
      state: {
        trainDetails: trainDetails
      }
    });
  }

  render() {
    return (
      <tr className="hoverEffect displayList padding">
        <td >
          <h4><b>
            {/* train name */}
            {this.props.train.trainName}
          </b></h4>
          <p className="text-muted">
            {/* train number */}
            {this.props.train.trainNumber}
          </p>
        </td>
        <td>
          <h4><b>
            {/* departure time */}
            {this.state.departureTime}
          </b></h4>
          <p className="text-muted">
            {/* boarding city */}
            {this.props.train.cityFrom.cityName}
          </p>
        </td>
        <td id="adjust">
          <h4><b>
            {/* duration (HOURS) */}
            {this.state.durationTime.hours}
          </b> hrs : <b>
              {/* duration (MINS) */}
              {this.state.durationTime.minutes}
            </b> mins
                    </h4>
        </td>
        <td>
          <h4><b>
            {/* arrival time */}
            {this.state.arrivalTime}
          </b></h4>
          <p className="text-muted">
            {/* destination city */}
            {this.props.train.cityTo.cityName}
          </p>
        </td>
        <td>
          <h4><b><Icon name="rupee sign" />
            {/* estimated price */}
            <NumberFormat value={this.props.train.seatPrice} displayType={'text'}
              thousandSeparator={true} thousandsGroupStyle='lakh' />
          </b></h4>
        </td>
        <td>
          {/* button to be mapped */}
          <Button
            onClick={this.bookNow}
            variant="contained"
            size="huge">
            <h4 className="text-white">
              <Icon name="ticket" /> BOOK NOW
                        </h4>
          </Button>
        </td>
      </tr >
    )
  }
}

export default class TrainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: []
    }
     this.trainsList = this.trainsList.bind(this);
     console.log(this.props.location.state)
  }

  componentDidMount() {
    let filterParams = {
      cityFrom: this.props.location.state.cityFrom.id,
      cityTo: this.props.location.state.cityTo.id,
      travellersCount: this.props.location.state.travellersCount,
      stringDate: this.props.location.state.stringDate
    }
    console.log(filterParams);
    axios.post('http://localhost:4000/trains/getFilteredTrains/', filterParams).then(response => {
      this.setState({
        trains: response.data.trains
      })
      console.log(this.state.trains)
    }).catch(function (error) {
      console.log(error.stack);
    })
  }

  trainsList() {
    let trains = this.state.trains;
    let history = this.props.history;
    let travellersCount = this.props.location.state.travellersCount;
    return this.state.trains.map(
      function (currentTrain, i) {
        console.log(currentTrain)
        return <Train trains={trains} train={currentTrain} history={history} travellersCount={travellersCount} key={i} />
      }
    )
  }

  render() {
    return (
      <div>
      <NavBar/>
      <div className="background">
        {/* <Segment> */}
        {/* Editable list */}
        {/* </Segment> */}
        <Grid>
          <Grid.Row id="segment">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={10}>
              <table style={{ width: '100%', color: 'black', textAlign: 'center' }} className="spacing" >
                <thead>
                  <tr>
                    <th className="backgroundDark">
                      <label className="label">
                        FROM:
                      </label>
                      <br />
                      <b className="font">
                        {this.props.location.state.cityFrom.value}
                      </b>
                    </th>
                    <br />
                    <Icon name="exchange" />
                    <th className="backgroundDark">
                      <label className="label">
                        TO:
                                            </label>
                      <br />
                      <b className="font">

                        {this.props.location.state.cityTo.value}

                      </b>
                    </th>

                    <th className="backgroundDark">
                      <label className="label">
                        DEPARTURE:
                                            </label>
                      <br />
                      <b className="font">{this.props.location.state.stringDate}</b>
                    </th>

                    <th className="backgroundDark">
                      <label className="label">
                        TRAVELLERS:
                      </label>
                      <br />
                      <b className="font">{this.props.location.state.travellersCount}</b>
                    </th>

                  </tr>
                </thead>
              </table>
            </Grid.Column>
            <Grid.Column width={5}>
              <br />
              {/* <Button type="submit" style={{ width: '200px', alignItems: 'center' }} variant="contained" size="huge"><h2 className="text-white">SEARCH</h2></Button> */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>

            <Grid.Column width={10}>
              <table style={{ width: '100%', color: 'black', textAlign: 'center' }} >
                <thead>
                  <tr className="unBold">
                    <th className="text-left">Sorted By:</th>
                    <th>Departure</th>
                    <th id="adjust">Duration</th>
                    <th>Arrival</th>
                    <th>Price
                    &nbsp;
                                            <Icon name="long arrow alternate down" /></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.trainsList()}
                  <tr style={{backgroundColor: 'gray'}}>
                    <td >
                      <h4><b>
                        {/* train name */}
                        Kanyakumari Express
                      </b></h4>
                      <p className="text-muted">
                        {/* train number */}
                        16381
                      </p>
                    </td>
                    <td>
                      <h4><b>
                        {/* departure time */}
                        19:25
                      </b></h4>
                      <p className="text-muted">
                        {/* boarding city */}
                        -
                      </p>
                    </td>
                    <td id="adjust">
                      <h4><b>
                        {/* duration (HOURS) */}
                        41
                      </b> hrs : <b>
                          {/* duration (MINS) */}
                          25
                        </b> mins
                                </h4>
                    </td>
                    <td>
                      <h4><b>
                        {/* arrival time */}
                        12:50
                      </b></h4>
                      <p className="text-muted">
                        {/* destination city */}
                        -
                      </p>
                    </td>
                    <td>
                      <h4><b><Icon name="rupee sign" />
                        {/* estimated price */}
                        <NumberFormat value={1150} displayType={'text'}
                          thousandSeparator={true} thousandsGroupStyle='lakh' />
                      </b></h4>
                    </td>
                    <td>
                    <h4 class="text-light">
                                                    Sorry, tickets are sold out.
                                                </h4>
                    </td>
                  </tr >
                </tbody>
              </table>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </div>
    )
  }
}