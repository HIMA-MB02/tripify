import React, { Component } from 'react';
import { Icon, Segment, Grid, Select, Container, Option } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import './flight-list.component.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { spacing } from '@material-ui/system';
import NavBar from '../navbar.component';
import NumberFormat from 'react-number-format';

class Bus extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            departureTime: this.props.bus.departureDate.slice(11, 16),
            durationTime: {
                hours: `${this.props.bus.duration}`,
                minutes: '00'
            },
            // Arrival time = Departure time + Duration
            arrivalTime: `0${parseInt(this.props.bus.departureDate.slice(11, 13)) + this.props.bus.duration}:00`
        }
        this.bookNow = this.bookNow.bind(this);
        console.log("ARRIVING AT" + this.state.arrivalTime);
    }
    bookNow() {
        let busDetails = {
            cityFrom: this.props.bus.cityFrom,
            cityTo: this.props.bus.cityTo,
            departureDate: this.props.bus.departureDate,
            flightName: this.props.bus.busName,
            flightNumber: this.props.bus.busNumber,
            departureTime: this.state.departureTime,
            duration: this.state.durationTime,
            arrivalTime: this.state.arrivalTime,
            seatPrice: this.props.bus.seatPrice,
            travellersCount: this.props.travellersCount
        }
        this.props.history.push({
            pathname: '/bus-booking',
            state: {
                busDetails: busDetails
            }
        });

    }
    render() {
        return (
            <tr className="hoverEffect displayList padding">
                <td >
                    <h4><b>
                        {/* bus name */}
                        {this.props.bus.busName}
                    </b></h4>
                    <p className="text-muted">
                        {/* bus number */}
                        {this.props.bus.busNumber}
                    </p>
                </td>
                <td>
                    <h4><b>
                        {/* departure time */}
                        {this.state.departureTime}
                    </b></h4>
                    <p className="text-muted">
                        {/* boarding city */}
                        {this.props.bus.cityFrom.cityName}
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
                        {this.props.bus.cityTo.cityName}
                    </p>
                </td>
                <td>
                    <h4><b><Icon name="rupee sign" />
                        {/* estimated price */}
                        <NumberFormat value={this.props.bus.seatPrice} displayType={'text'}
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

export default class BusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buses: [],
           
        }
        //this.componentDidMount();
        this.busesList = this.busesList.bind(this);

    }

    componentDidMount() {
        let filterParams = {
            cityFrom: this.props.location.state.cityFrom.id,
            cityTo: this.props.location.state.cityTo.id,
            travellersCount: this.props.location.state.travellersCount,
            stringDate: this.props.location.state.stringDate
        }
        axios.post('http://localhost:4000/buses/getFilteredBuses/', filterParams).then(response => {
            this.setState({
                buses: response.data.buses
            })
            console.log(this.state.buses)
        }).catch(function (error) {
            console.log(error.stack);
        })
    }

    busesList() {
        let buses = this.state.buses;
        let history = this.props.history;
        let travellersCount = this.props.location.state.travellersCount;
        return this.state.buses.map(
            function (currentBus, i) {
                console.log(currentBus)
                return <Bus buses={buses} bus={currentBus} history={history}  travellersCount={travellersCount} key={i} />
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
                            <table style={{ width: '100%', color: 'black', textAlign: 'center'}} className="spacing" >
                                <thead>
                                    <tr>
                                        <th className="backgroundDark">
                                            <label className="label">
                                                FROM:
                                            </label>
                                            <br />
                                            <b className="font">
                                            {/* {this.props.bus.cityFrom} */}
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
                                            {/* {this.props.bus.cityTo.cityName} */}
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
                                    {this.busesList()}
                                    <tr style={{backgroundColor: 'gray'}}>
                                        <td >
                                            <h4><b>
                                                {/* bus name */}
                                                Laxmi-Princess Neo
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* bus number */}
                                                MH 12 A 7936
                                            </p>
                                        </td>
                                        <td>
                                            <h4><b>
                                                {/* departure time */}
                                                21:00
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* boarding city */}
                                                -
                                            </p>
                                        </td>
                                        <td id="adjust">
                                            <h4><b>
                                                {/* duration (HOURS) */}
                                                11
                                            </b> hrs : <b>
                                                    {/* duration (MINS) */}
                                                    00
                                                </b> mins
                                            </h4>
                                        </td>
                                        <td>
                                            <h4><b>
                                                {/* arrival time */}
                                                08:00
                                            </b></h4>
                                            <p className="text-muted">
                                                {/* destination city */}
                                                -
                                            </p>
                                        </td>
                                        <td>
                                            <h4><b><Icon name="rupee sign" />
                                                {/* estimated price */}
                                                <NumberFormat value={500} displayType={'text'}
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