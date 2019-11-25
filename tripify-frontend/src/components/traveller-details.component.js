import React, { Component } from 'react';
import { Container, Grid, Card, Icon, Message, Accordion, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import '../App.css';
import NavBar from './navbar.component';
import Swal from "sweetalert2";


export default class TravellerDetails extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            booking: this.props.location.state.booking,
            bookingDetails: this.props.location.state,
            travellersCount: this.props.location.state.travellersCount,
            travellers: []
        }
        
    }
    render() {
        return (
            <div>
                <NavBar/>
            
                {/*Travellers Rendered Here */}
                 <Travellers history={this.props.history} travellersCount={this.state.travellersCount} bookingDetails={this.state.bookingDetails}/>
                           
            </div>
        )
    }
}

class Travellers extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            bookingDetails: this.props.bookingDetails,
            travellersCount: this.props.travellersCount,
            formIsValid: true,
            formSubmitted: true,
            bookingID: (Math.random().toString(36).substring(7)).toUpperCase(),
            errors: ''
        }

        this.redirectToPayment = this.redirectToPayment.bind(this);
        this.travellerDetails = this.travellerDetails.bind(this);
    }

    redirectToPayment() {
        //if(check if bookingID exists in the database)
        let customer = JSON.parse(localStorage.getItem('customer'));
        axios.post('http://localhost:4000/customers/hasCompletedForms', {travellersCount: this.state.travellersCount,bookingID: this.state.bookingID, email: customer.customerEmail}).then(response => {
            if(response.data.success) {
                this.props.history.push({
                    pathname: '/payment',
                    state: {
                        booking: 'flight',
                        totalAmount: this.state.bookingDetails.fareDetails.totalAmount * parseInt(this.state.bookingDetails.travellersCount),
                        bookingID: this.state.bookingID
                    }
                });
            } else {
                this.setState({
                    errors: 'Please fill in all the forms!'
                })
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    travellerDetails() {
        let temp = [];
        for(let i = 0; i < this.state.travellersCount; i++) {
            temp.push({
                iteration: i+1
            })
        }
        
        let bookingDetails = this.state.bookingDetails;
        let bookingID = this.state.bookingID;
        return temp.map(function(current, i) {
            return <Traveller iteration={current.iteration} bookingDetails={bookingDetails} bookingID = {bookingID}/>
        })
    }

    render() {
        return(
            <div className="background">
                <Container>
                    <Grid style={{ paddingTop: '2%' }}>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <h3>Traveller Details</h3>
                                <Card style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                
                            
                                    {this.travellerDetails()}
                                
                            </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <h3>Fare Summary</h3>
                                <Card container style={{ width: '100%', paddingLeft: '2%', paddingRight: '2%' }}>
                                    <Card.Content>
                                        <h5><b>Total Amount: </b>
                                            <span style={{ float: 'right' }}>
                                                <Icon name="rupee sign" />
                                                <NumberFormat value={this.state.bookingDetails.fareDetails.totalAmount * parseInt(this.state.bookingDetails.travellersCount)} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                            </span>
                                        </h5>
                                    </Card.Content>
                                    <div className="container">
                                         <div className="row text-center">
                                             <div className="col-lg-12 text-center">
                                                 <Button
                                                     onClick={this.redirectToPayment}
                                                     type="submit"
                                                     style={{ width: '100%', alignItems: 'center' }}
                                                     variant="contained"
                                                     size="huge"
                                                 ><h2 className="text-white">PAYMENT</h2></Button>
                                                <h3>{this.state.errors}</h3>
                                             </div>
                                         
                                         </div>
                                        <br />
                                    </div>
                
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

}

class Traveller extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            fields: { fname: '', lname: '', age: '', email: '', phone: ''},
            gender: 'Male',
            errors: {},
            bookingDetails: this.props.bookingDetails,
            formIsValid: true,
            formSubmitted: false,
            genderOptions: [
                {
                    text: 'Male',
                    value: 'Female',
                },
                {
                    text: 'Female',
                    value: 'Male'
                }
            ]
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.submitBookingForm = this.submitBookingForm.bind(this);
    }

    render() {
        return (
            <div>
                {!(this.state.formSubmitted)? 
                <Form method="post" name="bookingForm" onSubmit={this.submitBookingForm} style={{paddingTop: '2%'}}>
                        
                    <h3>ADULT {this.props.iteration}</h3>
                     <Form.Group widths={2}>
                         <Form.Input
                             fluid
                             icon='user'
                             iconPosition='left'
                             name='fname'
                             id='fname'
                             // value={this.state.fields.fname} 
                             onChange={this.handleChange}
                             placeholder='First Name'
                             type='text' />
                         <Form.Input
                             fluid
                             icon=''
                             iconPosition='left'
                             name='lname'
                             id='lname'        
                             // value={this.state.fields.lname} 
                             onChange={this.handleChange}
                             placeholder='Last Name'
                             type='text' />
                     </Form.Group>
                     <Form.Group widths={2}>
                         <Form.Input
                             fluid
                             icon='age'
                             iconPosition='left'
                             name='age'
                             id='age'
                             // value={this.state.fields.age} 
                             onChange={this.handleChange}
                             placeholder='Enter Age'
                             type='number' />
     
                         {/* </Form.Group> */}
                         <Form.Field>
                         <select onChange={this.handleChangeGender} value={this.state.gender}>
                                             {this.state.genderOptions.map(item => (
                                                 <option key={item.value} value={item.value}>
                                                 {item.text}
                                                 </option>
                                             ))}
                                         </select>
                         </Form.Field>
                     </Form.Group>
                     <Form.Group widths={2}>
                         <Form.Input
                             fluid
                             icon='mail'
                             iconPosition='left'
                             name='email'
                             id='email'
                             // value={this.state.fields.age} 
                             onChange={this.handleChange}
                             placeholder='Enter Email'
                             type='email' />
                         <Form.Input
                             fluid
                             icon='phone'
                             iconPosition='left'
                             name='phone'
                             id='phone'
                             // value={this.state.fields.age} 
                             onChange={this.handleChange}
                             placeholder='Enter Mobile Number'
                             type='number' />
                     </Form.Group>
     
                     <div className="container">
                                         <div className="row text-center">
                                             <div className="col-lg-12 text-center">
                                                 <Button
                                                     type="submit"
                                                     style={{ width: '200px', alignItems: 'center' }}
                                                     variant="contained"
                                                     size="huge"
                                                 ><h2 className="text-white">SUBMIT</h2></Button>
                                     
                                             </div>
                                         
                                         </div>
                                         <br />
                          </div>
                
                 </Form>
                
                    :
                    <div>
                        <Message style={{paddingTop: '2%'}}>
                            <h6><Icon name='checkmark box' />
                                Adult 1 record submitted.</h6>
                        </Message>
                        <br />
                    </div> 
                    }
            </div>
        )

    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["fname"]) {
            formIsValid = false;
            errors["fname"] = "Please enter First Name";
        }
        else{
            errors["fname"]="";
        }
        if (!fields["lname"]) {
            formIsValid = false;
            errors["lname"] = "Please enter Last Name";
        }
        else{
            errors["lname"]="";
        }
        if (!fields["age"]) {
            formIsValid = false;
            errors["age"] = "Please enter Age";
        }
        else{
            errors["age"]="";
        }
        if (!fields["gender"]) {
            formIsValid = false;
            errors["gender"] = "Please mention Age";
        }
        else{
            errors["gender"]="";
        }

        this.setState({
            errors:errors,
            formIsValid:formIsValid
        });

        return formIsValid;
    }


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields: fields
        });
        console.log(this.state.fields);
    }

    handleChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
        console.log(this.state);
    }

    submitBookingForm(e){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(126, 117, 250)',
            cancelButtonColor: 'rgb(231, 231, 231)',
            confirmButtonText: 'Proceed'
        }).then((result) => {
            if (result.value) {
               
        e.preventDefault();
        let bookingDetails= {
            bookingID: this.props.bookingID,
            bookingType: this.state.bookingDetails.booking,
            travellerName: this.state.fields.fname + ' ' + this.state.fields.lname,
            travellerEmail: this.state.fields.email,
            travellerAge: this.state.fields.age,
            travellerPhone: this.state.fields.phone,
            travellerGender: this.state.gender,
            flightBooking: {},
            trainBooking: {},
            busBooking: {},
            hotelBooking: {},
            totalPrice: 0
        }
        switch(this.state.bookingDetails.booking) {
            case 'flight':
                    bookingDetails.totalAmount = this.state.bookingDetails.fareDetails.totalAmount;
                    bookingDetails.flightBooking = {
                        flightName: this.state.bookingDetails.flightDetails.flightName,
                        flightNumber: this.state.bookingDetails.flightDetails.flightNumber,
                        cityFrom: this.state.bookingDetails.flightDetails.cityFrom,
                        cityTo: this.state.bookingDetails.flightDetails.cityTo,
                        departureDate: this.state.bookingDetails.flightDetails.departureDate, 
                        duration: this.state.bookingDetails.flightDetails.duration,
                    }
                break;
            case  'bus':
                    bookingDetails.totalAmount = this.state.bookingDetails.fareDetails.totalAmount;
                    bookingDetails.busBooking = {
                        busName: this.state.bookingDetails.busDetails.busName,
                        busNumber: this.state.bookingDetails.busDetails.busNumber,
                        cityFrom: this.state.bookingDetails.busDetails.cityFrom,
                        cityTo: this.state.bookingDetails.busDetails.cityTo,
                        departureDate: this.state.bookingDetails.busDetails.departureDate, 
                        duration: this.state.bookingDetails.busDetails.duration,
                    }
                break;
            case 'hotel':
                    bookingDetails.totalAmount = this.state.bookingDetails.fareDetails.totalAmount;
                    bookingDetails.hotelBooking = {
                        hotelName: this.state.bookingDetails.hotelDetails.hotelName,
                        city: this.state.bookingDetails.hotelDetails.city,
                        rating: this.state.bookingDetails.hotelDetails.rating,
                    }
                break;
            case 'train':
                    bookingDetails.totalAmount = this.state.bookingDetails.fareDetails.totalAmount;
                    bookingDetails.trainBooking = {
                        trainName: this.state.bookingDetails.trainDetails.trainName,
                        trainNumber: this.state.bookingDetails.trainDetails.trainNumber,
                        cityFrom: this.state.bookingDetails.trainDetails.cityFrom,
                        cityTo: this.state.bookingDetails.trainDetails.cityTo,
                        departureDate: this.state.bookingDetails.trainDetails.departureDate, 
                        duration: this.state.bookingDetails.trainDetails.duration,
                    }
                break;
        }

        
        let customer = JSON.parse(localStorage.getItem('customer'));
        axios.post('http://localhost:4000/customers/addBooking', {bookingDetails, email: customer.customerEmail}).then(response => {
            console.log(response.data);
            if(response.data.success) {
                this.setState({
                    formSubmitted: true
                })
            }
        }).catch(function (error) {
            console.log(error);
        })
        Swal.fire({
            title: 'Submitted!',
            text: "Your data has been saved!",
            icon: 'success',
            confirmButtonColor: 'rgb(126, 117, 250)'
        })
    } else {
        return;
    }
})
    
    }

}