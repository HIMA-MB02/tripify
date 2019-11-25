import React from 'react';
import { Container, Form, Grid, Segment, Card, Icon } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import './trainCard.css';
import '../../App.css';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import axios from 'axios';
/*VALIDATIONS REQUIRED:
    1. Check-in and Check-out Date 1 day appart
    2. After selection of Check-in date, Keep checkout date +1
 */
const Options = [
    {
        key: '1',
        text: '1',
        label: '1',
        value: '1'
    },
    {
        key: '2',
        text: '2',
        label: '2',
        value: '2'
    },
    {
        key: '3',
        text: '3',
        value: '3',
        label: '3'
    },
    {
        key: '4',
        text: '4',
        value: '4',
        label: '4'
    },
    {
        key: '5',
        text: '5',
        value: '5',
        label: '5'
    }

]

class HotelCard extends React.Component {
    constructor(props) {
        super(props);
        var tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        this.state = {
            city: '',
            checkinDate: new Date(),
            checkinDateString: '',
            checkoutDateString: '',
            checkoutDate: tomorrowDate,
            guestsCount: '',
            citiesList: [],
            errors: ''
        }

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidations() {
        let errors = {
            city: "",
            checkinDate: "",
            checkoutDate: '',
            guestsCount: ''
        }
        let valid = false;
        //Passenger Validations
        if(this.state.guestsCount ==  '') {
            errors.guestsCount =  'Please select the number of rooms!'
        }
        //Date Validation
        let today = new Date;
        let checkinDate = this.state.checkinDate.getFullYear() + "-" + (this.state.checkinDate.getMonth() + 1) + "-" + this.state.checkinDate.getDate();
        let checkoutDate = this.state.checkoutDate.getFullYear() + "-" + (this.state.checkoutDate.getMonth() + 1) + "-" + this.state.checkoutDate.getDate()
        if(this.state.checkinDate > this.state.checkoutDate) {
            errors.checkinDate = 'Woah! You can\'t check-out before you check-in!'
        }
        if(this.state.checkinDate < today) {
            errors.departureDate = `Should have gone for a trip yesterday.`
        }
        if(this.state.checkoutDate < today) {
            errors.departureDate = `Should have gone for a trip yesterday.`
        }
        if(checkinDate == checkoutDate) {
            errors.checkinDate = 'Ckeck-in and Check-out cannot be the same.'
        }

        //City Validations
        if(this.state.city.value == undefined) {
            errors.city = "Please select a city!"
        } else {
            valid = true;
        }
        console.log(errors);
        console.log(this.state);
        this.setState({
            errors: errors,
            isFormValid: valid
        })

    }
  
    componentDidMount() {
        axios.get('http://localhost:4000/cities/').then(response => {
            console.log(response.data.city)
            let cities = [];
            for (var city of response.data.city) {
                cities.push(
                    {
                        key: city.cityName,
                        text: city.cityName,
                        value: city.cityName,
                        label: city.cityName,
                        id: city._id
                    }
                )
            }

            this.setState({ citiesList: cities });
        }).catch(function (error) {
            console.log(error.stack);
        })
    }

    handleChange(name, value) {
        let state = this.state;
        state[name] = value;
        this.setState({ state });
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleValidations();
        if (this.state.isFormValid){
            this.props.history.push({
                pathname: '/hotels',
                state: {
                    city: this.state.city,
                    checkinDate: this.state.checkinDate.getFullYear() + "-" + (this.state.checkinDate.getMonth() + 1) + "-" + this.state.checkinDate.getDate(),
                    checkoutDate: this.state.checkoutDate.getFullYear() + "-" + (this.state.checkoutDate.getMonth() + 1) + "-" + this.state.checkoutDate.getDate(),
                    roomCount: this.state.guestsCount.value
                }
            });
        }
    }

    render() {
        return (
            <Card className="centered" style={{color: 'black' ,backgroundColor:'white', minHeight: '40vh', width: '80%', borderRadius: 30}}>

            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <br /><br/>
                    <Container>
                        <br />
                        <h6><b><Icon name="hotel" size="large"/>BOOK DOMESTIC AND INTERNATIONAL HOTELS</b></h6>                    
                        <div className="row " divided style={{ border: '1px solid #E1D5D3', borderRadius: 20 }}>
                        
                        {/*  CITY DROPDOWN */}
                        <div className="col-lg-3 text-left hoverEffect"  > 
                            <label className="fixit"> 
                                <br/>
                            CITY:
                            </label>
                            <Select name="city" onChange={this.handleChange.bind(this, 'city')} value={this.state.cityFrom} options={this.state.citiesList} className="noHover" value={this.state.city} name="city" onChange={this.handleChange.bind(this, 'city')} /> <br />
                            {this.state.errors.city}
                        </div>
                       
                        <div className="col-lg-3 text-left hoverEffect">
                            <label className="fixit"><br />CHECK-IN: </label>
                            <DatePicker
                                name="checkinDate"
                                selected={this.state.checkinDate}
                                onChange={this.handleChange.bind(this, 'checkinDate')}
                                id="resize"
                            /><br />
                            {this.state.errors.checkinDate}
                        </div>
          
                        <div className="col-lg-3 text-left hoverEffect">
                            <label className="fixit">
                            <br/>
                                CHECK-OUT: 
                            </label>
                            <DatePicker
                                name="checkoutDate"
                                selected={this.state.checkoutDate}
                                onChange={this.handleChange.bind(this, 'checkoutDate')}
                                id="resize"
                            />
                        <br/>
                            {this.state.errors.checkoutDate}
                            </div>
                        {/*  GUESTS DROPDOWN */}
                    <div className="col-lg-3 text-left hoverEffect"  >
                            <label className="fixit">
                            <br/>
                            GUESTS: 
                          
                            </label>
                            <Select name="guestsCount" onChange={this.handleChange.bind(this, 'guestsCount')} value={this.state.guestsCount} options={Options} className="noHover" value={this.state.guestsCount} name="guestsCount" onChange={this.handleChange.bind(this, 'guestsCount')}/>
                            {this.state.errors.guestsCount}
                        </div>
                        &nbsp;
                       
                        <div className="container">
                                    <div className="row text-center">
                                        <div className="col-lg-12 text-center">
                                            <br />
                                            <Button
                                                type="submit"
                                                style={{ width: '200px', alignItems: 'center' }}
                                                variant="contained"
                                                size="huge"
                                            ><h2 className="text-white">SEARCH</h2></Button>
                                        </div>
                                    </div>
                                </div>
                                &nbsp; 
                    </div>
                    </Container>
                </Form> <br/>
            </Container>
            </Card>
        );
    }
}

export default withRouter(HotelCard);

