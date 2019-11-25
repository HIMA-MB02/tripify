import React from 'react'
import { Grid, Header, Segment, Form, Select, Icon }
    from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            errorsValidation: '',
            isFormValidated: false,
            OTP: '',
            OTPToMatch: '',
            age: 18,
            gender: 'Male',
            identification: '',
            genderOptions: [
                {
                    text: 'Male',
                    value: 'Male',
                },
                {
                    text: 'Female',
                    value: 'Female'
                }
            ]
        }
        //Handle Change
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeIdentification  = this.handleChangeIdentification.bind(this);
        this.handleOTPChange = this.handleOTPChange.bind(this);

        this.redirectLogin = this.redirectLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    }

    //HANDLE FORM CHANGES
    handleChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
          })
    }
    handleChangeGender(e) {
        console.log(e.target.value)
        this.setState({
            gender: e.value
        })
    }
    handleChangeAge(e) {
        this.setState({
            age: parseInt(e.target.value) 
        })
    }
    handleChangeIdentification(e) {
        this.setState({
            identification: e.target.value
        })
    }
    handleChangeLastName(e){
        this.setState({
            lastName: e.target.value
          })
    }
    handleChangeEmail(e){
        this.setState({
            email: e.target.value
          })
    }
    handleChangeMobile(e){
        this.setState({
            mobile: e.target.value
          })
    }
    handleChangePassword(e){
        this.setState({
            password: e.target.value
          })
    }
    handleChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
          })
    }
    handleOTPChange(e) {
        this.setState({
            OTP: e.target.value
        })
    }

    //Validations
    handleValidations() {
        if(this.state.password !== this.state.confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match!'
            }
        }
        return {
            success: true,
            message: 'Validated Successfully!'
        }
    }

    //HANDLE SUBMIT
    handleSubmit(e) {
        e.preventDefault();
        let isValid = this.handleValidations();

        if(isValid.success) {     
            this.setState({
                isFormValidated: true
            })
            axios.post('http://localhost:4000/customers/prepareAndSendOTP', {name: this.state.firstName,email: this.state.email}).then(response => {
                this.setState({
                    OTPToMatch: response.data.OTP
                })
            }).catch(function (error) {
                console.log(error.stack);
            })

        } else {
            this.setState({
                errorsValidation: isValid.message
            })
        }

    }

    handleSubmitOTP(e) {
        e.preventDefault();
        if(this.state.OTP == this.state.OTPToMatch) {
            let user  = {
                customerName: this.state.firstName + ' ' + this.state.lastName,
                customerEmail:this.state.email,
                customerPhone:this.state.mobile,
                customerPassword:this.state.password,
                customerAge: this.state.age,
                customerIdentification: this.state.identification,
                customerGender: this.state.gender
            }
            console.log(user);
            axios.post('http://localhost:4000/customers/', user).then(response => {
                console.log(response.data.message);
                axios.post('http://localhost:4000/customers/login', {email:user.customerEmail, password:user.customerPassword}).then(response => {
                    localStorage.setItem('isLoggedin', "true");
                    localStorage.setItem('customer', JSON.stringify(response.data.customer));
                    
                    let currentState = JSON.parse(localStorage.getItem('currentState'));
                    localStorage.removeItem('currentState');
                    if(currentState != null) {
                    // alert('Do you want to continue your session?');
                    Swal.fire({
                        title: 'Continue?',
                        text: "Do you want to continue your session?",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: 'rgb(126, 117, 250)',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.value) {
                    this.props.history.push({
                        pathname: '/traveller-details',
                        state: currentState
                    });
                }
            })
                    } else {
                    this.props.history.push('/');
                    }
                    
                }).catch(function (error) {
                    console.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })
        }
    }

    redirectLogin() {
        this.props.history.push('/login')
    } 
    render() {
        return (
            <div>
            <div className="background">
                <br />
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment stacked>
                        <Link to='/'>
                            <Icon link name='close' />
                        </Link>
                        <Header as='h2' textAlign='center' style={{color: 'rgb(90, 78, 255)'}}>
                            Create New Account
                    </Header>

                        <Form size='large' onSubmit={this.handleSubmit}>
                        { this.state.isFormValidated ? 
                        <div>
                        <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            name='firstName'
                            id='firstName'
                            placeholder='First Name'
                            type='text'
                            disabled
                            onChange={this.handleChangeFirstName} value={this.state.firstName} />
                        <Form.Input
                            fluid
                            // icon='user'
                            iconPosition='left'
                            name='lastName'
                            id='lastName'
                            placeholder='Last Name'
                            type='text'
                            disabled
                            onChange={this.handleChangeLastName} value={this.state.lastName} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Input
                            width='8'
                            fluid
                            icon='user'
                            iconPosition='left'
                            name='age'
                            id='age'
                            placeholder='Age'
                            type='number'
                            disabled
                            onChange={this.handleChangeAge} value={this.state.age} />
                            <select onChange={this.handleChangeGender} 
                            disabled value={this.state.gender} > 
                                {this.state.genderOptions.map(item => (
                                    <option key={item.value} value={item.value}>
                                    {item.text}
                                    </option>
                                ))}
                            </select>
                    </Form.Group>
                    <Form.Input
                        fluid
                        icon='mail'
                        iconPosition='left'
                        name='email'
                        id='email'
                        placeholder='E-mail Address'
                        type='text'
                        disabled
                        onChange={this.handleChangeEmail} value={this.state.email} />
                    <Form.Input
                        fluid
                        icon='phone'
                        iconPosition='left'
                        name='mobile'
                        id='mobile'
                        placeholder='Mobile Number'
                        type='number'
                        disabled
                        onChange={this.handleChangeMobile} value={this.state.mobile} />
                    <Form.Input
                        fluid
                        icon='address book'
                        iconPosition='left'
                        name='identification'
                        id='identification'
                        placeholder='Passport Number'
                        type='text'
                        disabled
                        onChange={this.handleChangeIdentification} value={this.state.identification} />

                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        name='password'
                        id='password'
                        placeholder='Password'
                        type='password'
                        disabled
                        onChange={this.handleChangePassword} value={this.state.password} />

                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        type='password'
                        disabled
                        onChange={this.handleChangeConfirmPassword} value={this.state.confirmPassword} />

                    <p class="text-muted">{this.state.errorsValidation}</p>
                    <Form.Input
                                    fluid
                                    icon='key'
                                    iconPosition='left'
                                    name='OTP'
                                    id='OTP'
                                    placeholder='OTP'
                                    type='text'
                                    onChange={this.handleOTPChange} value={this.state.OTP} />
                                    <br />
                    </div>
                        : 
                            <div>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='firstName'
                                    id='firstName'
                                    placeholder='First Name'
                                    type='text'
                                    onChange={this.handleChangeFirstName} value={this.state.firstName} />
                                <Form.Input
                                    fluid
                                    // icon='user'
                                    iconPosition='left'
                                    name='lastName'
                                    id='lastName'
                                    placeholder='Last Name'
                                    type='text'
                                    onChange={this.handleChangeLastName} value={this.state.lastName} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Input
                                    width='8'
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='age'
                                    id='age'
                                    placeholder='Age'
                                    type='number'
                                    onChange={this.handleChangeAge} value={this.state.age} />
                                    <select onChange={this.handleChangeGender} value={this.state.gender}>
                                        {this.state.genderOptions.map(item => (
                                            <option key={item.value} value={item.value}>
                                            {item.text}
                                            </option>
                                        ))}
                                    </select>
                            </Form.Group>
                            <Form.Input
                                fluid
                                icon='mail'
                                iconPosition='left'
                                name='email'
                                id='email'
                                placeholder='E-mail Address'
                                type='text'
                                onChange={this.handleChangeEmail} value={this.state.email} />
                            <Form.Input
                                fluid
                                icon='phone'
                                iconPosition='left'
                                name='mobile'
                                id='mobile'
                                placeholder='Mobile Number'
                                type='number'
                                onChange={this.handleChangeMobile} value={this.state.mobile} />
                            <Form.Input
                                fluid
                                icon='address book'
                                iconPosition='left'
                                name='identification'
                                id='identification'
                                placeholder='Passport Number'
                                type='text'
                                onChange={this.handleChangeIdentification} value={this.state.identification} />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='password'
                                id='password'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChangePassword} value={this.state.password} />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                type='password'
                                onChange={this.handleChangeConfirmPassword} value={this.state.confirmPassword} />

                            <p class="text-muted">{this.state.errorsValidation}</p>
                            </div>
                            }
                                

                            
                            <span style={{float: 'left'}}>
                            {!(this.state.isFormValidated) ?
                                <Button
                                    type="submit"
                                    fluid 
                                    size='large'>
                                    Register
                                </Button>
                                :
                                <Button
                                    onClick={this.handleSubmitOTP}
                                    fluid size='large'>
                                    VERIFY
                                </Button>
                            }
                            </span>
                            <span style={{float: 'right'}}>
                            All ready have an account? &nbsp; &nbsp;
                        {/* <Button onClick={this.redirectLogin}>Login</Button> */}
                            <Link to='/login'>Login</Link>
                        </span>
                        <br/><br/>
                        </Form>
                        
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
            <div className="background text-center">
                &copy; TRIPIfy
            </div>
            </div>
        )
    }
}