import React, { Component } from 'react';
import { Icon, Segment, Grid, Select, Container, Option, Message } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import './flight-list.component.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { spacing } from '@material-ui/system';
import NavBar from '../navbar.component';
import NumberFormat from 'react-number-format';

class Flight extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            departureTime: this.props.flight.departureDate.slice(11, 16),
            durationTime: {
                hours: `0${this.props.flight.duration}`,
                minutes: '00'
            },
            arrivalTime: `0${parseInt(this.props.flight.departureDate.slice(11, 13)) + this.props.flight.duration}:00`
        }
        this.bookNow = this.bookNow.bind(this);
        console.log("ARRIVING AT" + this.state.arrivalTime);
    }
    bookNow() {
        let flightDetails = {
            cityFrom: this.props.flight.cityFrom,
            cityTo: this.props.flight.cityTo,
            departureDate: this.props.flight.departureDate,
            flightName: this.props.flight.flightName,
            flightNumber: this.props.flight.flightNumber,
            departureTime: this.state.departureTime,
            duration: this.state.durationTime,
            arrivalTime: this.state.arrivalTime,
            seatPrice: this.props.flight.seatPrice,
            travellersCount: this.props.travellersCount
        }
        this.props.history.push({
            pathname: '/flight-booking',
            state: {
                flightDetails: flightDetails
            }
        });

    }
    render() {
        return (
            <tr className="hoverEffect displayList padding">
                <td >
                    <h4><b>
                        {/* plane name */}
                        {this.props.flight.flightName}
                    </b></h4>
                    <p className="text-muted">
                        {/* plane number */}
                        {this.props.flight.flightNumber}
                    </p>
                </td>
                <td>
                    <h4><b>
                        {/* departure time */}
                        {this.state.departureTime}
                    </b></h4>
                    <p className="text-muted">
                        {/* boarding city */}
                        {this.props.flight.cityFrom.cityName}
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
                    <p className="text-muted">Non Stop</p>
                </td>
                <td>
                    <h4><b>
                        {/* arrival time */}
                        {this.state.arrivalTime}
                    </b></h4>
                    <p className="text-muted">
                        {/* destination city */}
                        {this.props.flight.cityTo.cityName}
                    </p>
                </td>
                <td>
                    <h4><b><Icon name="rupee sign" />
                        {/* estimated price */}
                        <NumberFormat value={this.props.flight.seatPrice} displayType={'text'}
                            thousandSeparator={true} thousandsGroupStyle='lakh' />
                    </b></h4>
                </td>
                <td>
                    {/* button to be mapped */}
                    <Button
                        onClick={this.bookNow}
                        variant="contained"
                        size="huge"
                    >
                        <h4 className="text-white">
                            <Icon name="ticket" /> BOOK NOW
                        </h4>
                    </Button>
                </td>
            </tr >
        )
    }
}

export default class FlightList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
           
        }
        //this.componentDidMount();
        this.flightsList = this.flightsList.bind(this);

    }

    componentDidMount() {
        let filterParams = {
            cityFrom: this.props.location.state.cityFrom.id,
            cityTo: this.props.location.state.cityTo.id,
            travellersCount: this.props.location.state.travellersCount,
            stringDate: this.props.location.state.stringDate
        }
        axios.post('http://localhost:4000/flights/getFilteredFlights/', filterParams).then(response => {
            this.setState({
                flights: response.data.flights
            })
            console.log(this.state.flights)
        }).catch(function (error) {
            console.log(error.stack);
        })
    }

    flightsList() {
        let flights = this.state.flights;
        let history = this.props.history;
        let travellersCount = this.props.location.state.travellersCount;
        return this.state.flights.map(
            function (currentFlight, i) {
                console.log(currentFlight)
                return <Flight flights={flights} flight={currentFlight} history={history} travellersCount={travellersCount} key={i} />
            }
        )
    }

    render() {
        return (
            <div>
            <NavBar/>
            <div className="background">
                <Grid>
                    <Grid.Row id="segment">
                        <Grid.Column width={1}></Grid.Column>

                        <Grid.Column width={10}>
                            <table style={{ width: '100%', color: 'black', textAlign: 'center'}} className="spacing" >
                                <thead>
                                    <tr>
                                        <th className="backgroundDark">
                                            <label className="label">
                                                FROM:
                                            </label>
                                            <br />
                                            <b className="font">
                                            {/* {this.props.flight.cityFrom} */}
                                            {this.props.location.state.cityFrom.value}
                                            </b>
                                        </th>
                                        <br/>
                                        <Icon name="exchange"/>
                                        <th className="backgroundDark">
                                            <label className="label">
                                                TO:
                                            </label>
                                            <br />
                                            <b className="font">
                                            {/* {this.props.flight.cityTo.cityName} */}
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
                            <br/>
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
                                            <Icon name="long arrow alternate down"/></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {this.flightsList()}
                                    <tr style={{backgroundColor: 'gray'}}>
                                        <td >
                                            <h4><b>
                                                {/* plane name */}
                                                IndiGo
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* plane number */}
                                                KL 445
                                            </p>
                                        </td>
                                        <td>
                                            <h4><b>
                                                {/* departure time */}
                                                16:30
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* boarding city */}
                                                -
                                            </p>
                                        </td>
                                        <td id="adjust">
                                            <h4><b>
                                                {/* duration (HOURS) */}
                                                02
                                            </b> hrs : <b>
                                                    {/* duration (MINS) */}
                                                    00
                                                </b> mins
                                            </h4>
                                            <p className="text-muted">Non Stop</p>
                                        </td>
                                        <td>
                                            <h4><b>
                                                {/* arrival time */}
                                                18:30
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* destination city */}
                                                -
                                            </p>
                                        </td>
                                        <td>
                                            <h4><b><Icon name="rupee sign" />
                                                {/* estimated price */}
                                                <NumberFormat value={10000} displayType={'text'}
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