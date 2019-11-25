import React, { Component } from 'react';
import { Container, Grid, Card, Icon, Checkbox, Radio, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import '../../App.css';
import NavBar from '../navbar.component';
import Swal from "sweetalert2";

class FareSummary extends Component {

    constructor(props){
        super(props);
            
        let feeAndSurcharge = 2456;
        let otherServices = 5;
        let subAmount = otherServices + feeAndSurcharge + this.props.seatPrice;
        let totalAmount = subAmount * this.props.busDetails.travellersCount;
        this.state = {
            travellersCount: this.props.busDetails.travellersCount,
            seatPrice: this.props.seatPrice,
            feeAndSurcharge: feeAndSurcharge,
            otherServices: otherServices,
            subAmount: subAmount,
            totalAmount: totalAmount,
            displayInsurance: false
            }

            this.redirectToNext = this.redirectToNext.bind(this);
    }

    redirectToNext() {
        let insurance = 0;
        if(this.state.displayInsurance == true) {
            insurance = 20;
        }
        let busFareDetails = {
            seatPrice: this.state.seatPrice,
            feeAndSurcharge: this.state.feeAndSurcharge,
            otherServices: this.state.otherServices,
            insurance: insurance,
            totalAmount: this.state.subAmount + insurance,
        }

        if(localStorage.getItem('isLoggedin') == "true") {
            this.props.history.push({
                pathname: '/traveller-details',
                state: {
                    booking: 'bus',
                    busDetails: this.props.busDetails,
                    fareDetails: busFareDetails,
                    travellersCount: this.props.busDetails.travellersCount
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
                    booking: 'bus',
                    busDetails: this.props.busDetails,
                    fareDetails: busFareDetails,
                    travellersCount: this.props.busDetails.travellersCount
                }))
                this.props.history.push({
                    pathname: '/login'
                });
            }
        })
        }
    }
    render(){
        return(

            <div>
            <h3>Fare Summary</h3>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Header style={{ paddingTop: '2%' }}>
                                        <p><b>Base Fare: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={this.state.seatPrice} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </p>

                                        <p><b>Fee & Surcharges: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={this.state.feeAndSurcharge} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </p>
                                        {(this.props.insurance == "no")?
                                            
                                            <p><b>Insurance: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={20} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </p>:null}
                                        
                                        <p><b>Other Services: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={this.state.otherServices} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </p>
                                    </Card.Header>
                                    <Card.Content>
                                        <h5><b>Sub Amount: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={this.state.subAmount + this.props.totalAmount} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </h5>
                                    </Card.Content>
                                    <Card.Content>
                                        <h5><b>Total Amount: <br/> {(this.state.subAmount + this.props.totalAmount)}* {this.state.travellersCount}</b>
                                            <span style={{ float: 'right' }}>
                                                <h3><Icon name="rupee sign" />
                                                <NumberFormat value={(this.state.subAmount + this.props.totalAmount)* this.state.travellersCount} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' /></h3>
                                            </span>
                                        </h5>
                                    </Card.Content>
                                </Card>
                                <Card style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Content>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={12}>
                                                    Cancellation & Date change charges
                                            </Grid.Column>
                                                <Grid.Column width={4} >
                                                    <Icon name='triangle down' />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                                <Button
                                    onClick={this.redirectToNext}
                                    type="submit"
                                    style={{ width: '200px', alignItems: 'center' }}
                                    variant="contained"
                                    size="huge"
                                ><h2 className="text-white">CONTINUE</h2></Button>
                            
        </div>

        );
       }
}

export default class BusBooking extends Component {
    constructor(props) {
        super(props);
        let dateHandler = new Date(this.props.location.state.busDetails.departureDate);
        let dateHandlerNumber =  dateHandler.getDay();
        let departureDay = '';
        switch(dateHandlerNumber) {
            case 0:
                departureDay = 'Sun';
                break;
            case 1:
                departureDay = 'Mon';
                break;
            case 2:
                departureDay = 'Tue';
                break;
            case 3:
                departureDay = 'Wed';
                break;
            case 4:
                departureDay = 'Thu';
                break;
            case 5:
                departureDay = 'Fri';
                break;
            case 6: 
                departureDay = 'Sat'; 
                break;
        }
        this.state = {
            arrivalTime: this.props.location.state.busDetails.arrivalTime,
            cityFrom: this.props.location.state.busDetails.cityFrom,
            cityTo: this.props.location.state.busDetails.cityTo,
            departureDate: this.props.location.state.busDetails.departureDate,
            departureTime: this.props.location.state.busDetails.departureTime,
            departureDay: departureDay,
            duration: this.props.location.state.busDetails.duration,
            busName: this.props.location.state.busDetails.busName,
            busNumber: this.props.location.state.busDetails.busNumber,
            seatPrice: this.props.location.state.busDetails.seatPrice,
            travellersCount: this.props.location.state.busDetails.travellersCount,
            value: 'no',
            totalAmount: 20
        }
        console.log(this.props.location.state.busDetails)
    }
    state = {}
    handleChange(name, value) {
        let state = this.state;
        state[name] = value;
        this.setState({ state });
    }
    handleRadioChange = (e, { value }) => {
        this.setState({ value })
        if(this.state.value == "no") {
            this.setState({
                totalAmount: 0
            })
        } else {
            this.setState({
                totalAmount: 20
            })
        }
        console.log(this.state.totalAmount)
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
                                <h3>Itinerary</h3>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Header style={{ paddingTop: '2%' }}>
                                        <h4>{this.state.cityFrom.cityName}-{this.state.cityTo.cityName}</h4>
                                        <p>Non-stop | {this.state.duration.hours} hrs {this.state.duration.minutes} mins | Economy</p>
                                    </Card.Header>
                                    <Card.Content>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={3}>
                                                    <h6><b>
                                                        {this.state.busName}
                                                    </b></h6>
                                                    <p className="text-muted">
                                                        {this.state.busNumber}
                                                    </p>
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <h6>DEPARTING AT:</h6>
                                                    <p className="text-muted">
                                                        <b>
                                                            {this.state.departureTime}
                                                        </b>
                                                    </p>
                                                    {this.state.departureDay}, {this.state.departureDate.slice(0, 10)}
                                                <p className="text-muted">
                                                    {this.state.cityFrom.cityName}
                                                    </p>
                                                    {this.state.cityFrom.cityBusstop} <br />
                                                    Terminal 3
                                            </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <h6>DURATION:</h6>
                                                    <br />
                                                    <h5><b>
                                                        {this.state.duration.hours}
                                                    {/* {this.state.durationTime.hours} */}
                                                    </b> hrs : <b>
                                                         {this.state.duration.minutes}
                                                    {/* {this.state.durationTime.minutes} */}
                                                        </b> mins
                                                </h5>
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <h6>
                                                    ARRIVING AT:
                                                    </h6>
                                                    <p className="text-muted">
                                                        <b>
                                                            {/*ARRIVAL TIME HERE */}
                                                            {this.state.departureTime}
                                                        </b>
                                                    </p>
                                                    {this.state.departureDay}, {this.state.departureDate.slice(0, 10)}
                                                <p className="text-muted">
                                                    {this.state.cityTo.cityName}
                                                    </p>
                                                    {this.state.cityTo.cityBusstop}<br />
                                                    Terminal 3
                                            </Grid.Column>
                                            </Grid.Row>
                                        </Grid>


                                        <hr />
                                        <Grid divided>
                                            <Grid.Row>
                                                <Grid.Column width={3}>
                                                    <p>CABIN BAGGAGE:</p>
                                                    <p>Allowed</p>
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <p>CHECK-IN</p>
                                                    <p>25Kgs </p>
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <p>CABIN</p>
                                                    <p>8Kgs</p>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                                <h3>Add-ons</h3>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Content style={{ paddingTop: '2%' }}>
                                        <h3>INSURANCE</h3>
                                        <p>Secure your trip</p>
                                        <Grid columns='three'>
                                            <Grid.Row>
                                                <Grid.Column style={{ paddingLeft: '5%' }}>
                                                    <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%', height: '90%' }}>
                                                        <Card.Header>Total loss of checked-in baggage</Card.Header>
                                                        <Card.Content>
                                                            <p>Claim upto </p>
                                                            <p>
                                                                {/* <Icon name="rupee sign" /> */}
                                                                ₹ 20,000</p>
                                                        </Card.Content>
                                                    </Card>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%', height: '90%' }}>
                                                        <Card.Header>Personal Accident</Card.Header>
                                                        <Card.Content>
                                                            <p>Claim upto </p>
                                                            <p>
                                                                {/* <Icon name="rupee sign" /> */}
                                                                ₹ 25,00,000</p>
                                                        </Card.Content>
                                                    </Card>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%', height: '90%' }}>
                                                        <Card.Header>Total loss of checked-in baggage</Card.Header>
                                                        <Card.Content>
                                                            <p>Claim upto </p>
                                                            <p>
                                                                {/* <Icon name="rupee sign" /> */}
                                                                ₹ 20,000</p>
                                                        </Card.Content>
                                                    </Card>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Form>
                                            <Form.Field>
                                                {/* Selected value: <b>{this.state.value}</b> */}
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='No, I do not wish to secure my trip'
                                                    name='radioGroup'
                                                    value='yes'
                                                checked={this.state.value === 'yes'}
                                                onChange={this.handleRadioChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Yes, secure my trip, I agree to the Terms & Conditions & Good 
                                                    Health terms, and confirm all passengers are between 2 to 70 years of age'
                                                    name='radioGroup'
                                                    value='no'
                                                checked={this.state.value === 'no'}
                                                onChange={this.handleRadioChange}
                                                />
                                            </Form.Field>
                                        </Form>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            
                            
                            {/* Fare Summary */}
                            <Grid.Column width={4}>
                                <FareSummary history={this.props.history} seatPrice={this.state.seatPrice} insurance={this.state.value} busDetails={this.state} totalAmount={this.state.totalAmount}/>
                             </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            </div>
        )
    }
}