import React, { Component } from 'react';
import { Icon, Segment, Grid, Select, Container, Option } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import './flight-list.component.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { spacing } from '@material-ui/system';
import NavBar from '../navbar.component';
import NumberFormat from 'react-number-format';

class Hotel extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        // this.state = {
        //     departureTime: this.props.hotel.departureDate.slice(11, 16),
        //     durationTime: {
        //         hours: `0${this.props.flight.duration}`,
        //         minutes: '00'
        //     },
        //     arrivalTime: `0${parseInt(this.props.flight.departureDate.slice(11, 13)) + this.props.flight.duration}:00`
        // }
        this.bookNow = this.bookNow.bind(this);
        // console.log("ARRIVING AT" + this.state.arrivalTime);
    }
    bookNow() {
        let hotelDetails = {
            hotelName: this.props.hotel.hotelName,
            rating: this.props.hotel.rating,
            pricePerRoom: this.props.hotel.pricePerRoom,
            travellersCount: this.props.travellersCount,
            city: this.props.city
        }
        this.props.history.push({
            pathname: '/hotel-booking',
            state: {
                hotelDetails: hotelDetails
            }
        });

    }
    render() {
        return (
            <tr className="hoverEffect displayList padding">
                <td >
                    <h4><b>
                        {/* hotel name */}
                        {this.props.hotel.hotelName}
                    </b></h4>
                </td>
                <td>
                    <h4><b>
                        {/* rating */}
                        {this.props.hotel.rating}
                    </b></h4>
                </td>
                <td>
                    <h4><b><Icon name="rupee sign" />
                        {/* price per room */}
                        <NumberFormat value={this.props.hotel.pricePerRoom} displayType={'text'}
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

export default class HotelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
           
        }
        //this.componentDidMount();
        this.hotelsList = this.hotelsList.bind(this);

    }

    componentDidMount() {
        let filterParams = {
            cityId: this.props.location.state.city.id,
            checkinDate: this.props.location.state.checkinDate,
            checkoutDate: this.props.location.state.checkoutDate,
            roomCount: this.props.location.state.roomCount
        }
        
        axios.post('http://localhost:4000/cities/getFilteredHotels/', filterParams).then(response => {
            this.setState({
                hotels: response.data.cityHotels
            })
        }).catch(function (error) {
            console.log(error.stack);
        })
    }

    hotelsList() {
        let hotels = this.state.hotels;
        let history = this.props.history;
        let city = this.props.location.state.city.value;
        let travellersCount = this.props.location.state.roomCount;
        return this.state.hotels.map(
            function (currentHotel, i) {
                console.log(currentHotel)
                return <Hotel hotels={hotels} city={city} hotel={currentHotel} history={history} travellersCount={travellersCount} key={i} />
            }
        )
    }

    render() {
        return (
            <div>
            <NavBar/>
            <div className="background">
                
                {/* Editable list */}
                <Grid>
                    <Grid.Row id="segment">
                        <Grid.Column width={1}></Grid.Column>

                        <Grid.Column width={10}>
                            <table style={{ width: '100%', color: 'black', textAlign: 'center'}} className="spacing" >
                                <thead>
                                    <tr>
                                        <th className="backgroundDark">
                                            <label className="label">
                                                CITY:
                                            </label>
                                            <br />
                                            <b className="font">
                                            {/* {this.props.hotel.cityFrom} */}
                                            {this.props.location.state.city.value}
                                            </b>
                                        </th>
                                        <br/>
                                        
                                        <th className="backgroundDark">
                                            <label className="label">
                                            CHECK-IN:
                                            </label>
                                            <br />
                                            <b className="font">{this.props.location.state.checkinDate}</b>
                                        </th>

                                        <th className="backgroundDark">
                                            <label className="label">
                                            CHECK-OUT:
                                            </label>
                                            <br />
                                            <b className="font">{this.props.location.state.checkoutDate}</b>
                                        </th>

                                        <th className="backgroundDark">
                                            <label className="label">
                                                ROOMS:
                                            </label>
                                            <br />
                                            <b className="font">{this.props.location.state.roomCount}</b>
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
                                        <th className="text-center">
                                        Sort By:
                                        </th>
                                        <th>User Rating</th>
                                        <th>Price &nbsp;
                                            <Icon name="long arrow alternate down"/></th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {this.hotelsList()}
                                    <tr style={{backgroundColor: 'gray'}}>
                                        <td >
                                            <h4><b>
                                                {/* hotel name */}
                                                Air Harbor Resort
                                            </b></h4>
                                        </td>
                                        <td>
                                            <h4><b>
                                                {/* rating */}
                                                3
                                            </b></h4>
                                        </td>
                                        <td>
                                            <h4><b><Icon name="rupee sign" />
                                                {/* price per room */}
                                                <NumberFormat value={2200} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </b></h4>
                                        </td>
                                        <td>
                                        <h4 class="text-light">
                                                    Sorry, no rooms available.
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