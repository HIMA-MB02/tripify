import React from 'react';
import { Container } from 'semantic-ui-react'
import { Radio, Form, Grid, Card, Icon } from 'semantic-ui-react'
import './trainCard.css'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from "react-router-dom";

// import DatePicker from "react-datepicker";
// import DayPickerInput from 'react-day-picker/DayPickerInput';
const Travellers = [
    {
        value: '1',
        label: '1',
        text: '1'
    },
    {
      value: '2',
      label: '2',
      text: '2'
  },
  {
      value: '3',
      label: '3',
      text: '3'
  },
  {
      value: '4',
      label: '4',
      text: '4'
  },
  {
      value: '5',
      label: '5',
      text: '5'
  }
  ]
class TrainCard extends React.Component {
    constructor(props) {
        super(props);
        //this.state = { date: '', value: ' ' };
        this.state = {
            cityFrom: '',
            cityTo: '',
            departureDate: new Date(),
            travellersCount: '',
            stringDate: '',
            citiesList: [],
            errors: {
                cityFrom: "",
                cityTo: "",
                departureDate: '',
                travellersCount: ''
            },
            isFormValid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleValidations() {
        let errors = {
            cityFrom: "",
            cityTo: "",
            departureDate: '',
            travellersCount: ''
        }
        let valid = false;
        //Passenger Validations
        if(this.state.travellersCount ==  '') {
            errors.travellersCount =  'Please select the number of passengers!'
        }
        //Date Validation
        let today = new Date();
        if(this.state.departureDate < today) {
            errors.departureDate = `Should have gone for a trip yesterday.`
        }
        //City Validations
        if(this.state.cityTo.value == undefined) {
            errors.cityTo = "Please enter Source City!"
        }
        if(this.state.cityFrom.value == undefined) {
            errors.cityFrom = "Please enter Destination City"
        } else if(this.state.cityFrom.value == this.state.cityTo.value) {
            errors.cityTo = ""
            errors.cityFrom = "Source and  Destination cannot be the same!"
        } 
        else {
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
    }
    handleSubmit(event) {
        event.preventDefault();
        this.handleValidations();
        if (this.state.isFormValid){
            let stringDate = this.state.departureDate.getFullYear() + "-" + (this.state.departureDate.getMonth() + 1) + "-" + this.state.departureDate.getDate();
            this.props.history.push({
                pathname: '/trains',
                state: {
                    cityFrom: this.state.cityFrom,
                    cityTo: this.state.cityTo,
                    travellersCount: this.state.travellersCount.value,
                    stringDate: stringDate
                }
            });
        }
    }

    render() {
        return (
            <Card className="centered" style={{backgroundColor:'white', color: 'black', minHeight: '40vh', width: '80%', borderRadius: 30}}>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <br /><br />
                    <Container>
                    <br />
                    <h6><b><Icon name="train" size="large"/>BOOK LOCAL AND INTER-CITY TRAINS</b></h6>                    <div className="row " divided style={{ border: '1px solid #E1D5D3', borderRadius: 20 }}>

                        {/* FOROM CITY DROPDOWN */}
                        <div className="col text-left hoverEffect"  >
                            <label className="fixit">
                                <br/>
                                FROM: 
                            </label>
                            <Select name="cityFrom" onChange={this.handleChange.bind(this, 'cityFrom')} value={this.state.cityFrom} options={this.state.citiesList} className="noHover" /> <br />
                            {this.state.errors.cityFrom}

                        </div>
                        {/* TO CITY DROP DOWN */}
                        <div className="col text-left hoverEffect">
                            <label className="fixit">
                                <br/>
                                TO:
                            </label>
                            <Select name="cityTo" onChange={this.handleChange.bind(this, 'cityTo')} value={this.state.cityTo} options={this.state.citiesList} className="noHover" /> 
                            {this.state.errors.cityTo}
                        </div>

                        {/* travel date calender */}
                        <div className="col text-left hoverEffect">
                            <label className="fixit">
                                <br/>
                                DEPARTURE: 
                                </label>
                                <DatePicker
                                name="departureDate"
                                 selected={this.state.departureDate}
                                 onChange={this.handleChange.bind(this, 'departureDate')}
                                 id="resize"
                            />
              
                            <br/>
                            {this.state.errors.departureDate}
                        </div>
                        <div className="col text-left hoverEffect"  >
                            <label className="fixit">
                            <br/>
                            PASSENGERS: 
                          
                            </label>
                            <Select name="travellersCount" options={Travellers} className="noHover" value={this.state.travellersCount} onChange={this.handleChange.bind(this, 'travellersCount')}/>
                            {this.state.errors.travellersCount}
                        </div> 
                        &nbsp;
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-lg-12 text-center">
                                    <br /><br />
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
                </Form>
                <br />
                </Container>
            </Card>
        );
    }
}

export default withRouter(TrainCard);

