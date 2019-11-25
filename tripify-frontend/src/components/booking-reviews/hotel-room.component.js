import React, { Component } from 'react';
import { Container, Grid, Card, Icon, Rating, Label, Rail, List } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import '../../App.css';
import NavBar from '../navbar.component';
import Swal from 'sweetalert2';
import Image2 from '../../hotel_images/img2.jpg'
import Image1 from '../../hotel_images/img1.jpg'
import Image3 from '../../hotel_images/img3.jpg'
import Image4 from '../../hotel_images/img4.jpg'
import Image6 from '../../hotel_images/img6.jpg'

export default class HotelBooking extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.hotelDetails);
        this.state = {
            hotelName: this.props.location.state.hotelDetails.hotelName,
            vacantRooms: this.props.location.state.hotelDetails.vacantRooms,
            rating: this.props.location.state.hotelDetails.rating,
            pricePerRoom: this.props.location.state.hotelDetails.pricePerRoom,
            travellersCount: this.props.location.state.hotelDetails.travellersCount
            }
            console.log(this.props.location.state.hotelDetails);
            this.redirectToNext = this.redirectToNext.bind(this)

    }
    redirectToNext() {
        let hotelFareDetails = {
            pricePerRoom: this.state.pricePerRoom,
            totalAmount: this.state.pricePerRoom,
        }
            if(localStorage.getItem('isLoggedin') == "true") {
                this.props.history.push({
                    pathname: '/traveller-details',
                    state: {
                        booking: 'hotel',
                        hotelDetails: this.props.location.state.hotelDetails,
                        fareDetails: hotelFareDetails,
                        travellersCount: this.state.travellersCount
                    }
                });
            } else { 
                Swal.fire({
                    title: 'Oops...',
                    text: "You need to login to continue!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(126, 117, 250)',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.value) {
                    localStorage.setItem('currentState', JSON.stringify({
                        booking: 'hotel',
                        hotelDetails: this.props.location.state.hotelDetails,
                        fareDetails: hotelFareDetails,
                        travellersCount: this.state.travellersCount
                    }))
                    this.props.history.push({
                        pathname: '/login'
                    });
                }
            })
            }
    }
    state = {}
    handleChange(name, value) {
        let state = this.state;
        state[name] = value;
        this.setState({ state });
    }

    render() {
        return (
            <div>
                <NavBar/>
            <div className="background">
                <Container>
                    <Grid style={{ paddingTop: '2%' }}>
                        <Grid.Row>

                            {/* Itinerary */}
                            <Grid.Column width={12}>
                                <h3>{this.state.hotelName} &nbsp;&nbsp;&nbsp;&nbsp;
                                <Rating defaultRating={this.state.rating} maxRating={5} disabled /></h3>
                               <div className='row'>
                                   <div className="col-lg-8">
                                       <img src={Image2} height="364" width="550" className="radius"/>
                                   </div>
                                   <div className="col-lg-4">
                                       <div className="row">
                                           <div className="col-lg-5">
                                           <img src={Image1} height="182" width="250" className="radius"/>
                                            </div>

                                       </div>
                                       <div className="row">
                                           <div className="col-lg-5">
                                           <img src={Image4} height="182" width="250" className="radius"/>
                                            </div>

                                       </div>
                                   </div>
                               </div>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <h3>Available Package</h3>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Header style={{ paddingTop: '2%' }}>
                                    <span>
                                        <p><b>{this.state.hotelName}</b></p>
                                        <List>
                                            <List.Item>
                                                {/* <List.Icon name='redo' /> */}
                                                <List.Content>Non Refundable</List.Content>
                                            </List.Item>
                                            <List.Item>
                                                {/* <List.Icon name='food' /> */}
                                                <List.Content>Breakfast</List.Content>
                                            </List.Item>
                                        </List>
                                        
                                        <span style={{float: 'right'}}>
                                            <List>
                                            <List.Item>
                                            <List.Content>Per Night</List.Content>
                                            <List.Content>For 2 Adults</List.Content>
                                            <List.Icon name="rupee sign" />
                                            <List.Content><h3><NumberFormat value={this.state.pricePerRoom} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' /></h3></List.Content>
                                                    </List.Item>
                                            </List>
                                        </span>
                                        </span>
                                    </Card.Header>
                                    <Card.Content>
                                        <Button
                                            onClick={this.redirectToNext}
                                            variant="contained"
                                            size="huge"
                                        >
                                            <h4 className="text-white">
                                                <Icon name="ticket" /> BOOK NOW
                                            </h4>
                                        </Button>
                                    </Card.Content>
                                </Card>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Header>
                                        <h3>What Guests Said</h3>
                                        <p>Based on 879 Reviews</p>
                                        <span style={{ float: 'right' }}>
                                            <Label><h4>{this.state.rating}</h4></Label>
                                        </span>
                                    </Card.Header>
                                    <Card.Content>
                                        <List>
                                            <List.Item>
                                                {/* <List.Icon name='redo' /> */}
                                                <List.Content>Courteous Staff</List.Content>
                                            </List.Item>
                                        </List>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            </div>

        )
    }
}