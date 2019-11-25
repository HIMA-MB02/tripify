import React from 'react'
import { Grid, Header, Segment, Form, Select, Icon }
    from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorsValidation: '',
            isFormValidated: false,
            OTP: '',
            OTPToMatch: ''
        }
        //Handle Change
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleOTPChange = this.handleOTPChange.bind(this);

        this.redirectLogin = this.redirectLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    }

    //HANDLE FORM CHANGES
    handleChangeEmail(e){
        this.setState({
            email: e.target.value
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
            axios.post('http://localhost:4000/customers/prepareAndSendOTP', {email: this.state.email}).then(response => {
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
        console.log(this.state);
        if((this.state.OTP == this.state.OTPToMatch) && (this.state.password == this.state.confirmPassword)) {
            let user  = {
                customerEmail:this.state.email,
                customerPassword: this.state.password
            }
            console.log(user);
            axios.post('http://localhost:4000/customers/changePassword/', user).then(response => {
                console.log(response.data);
                alert('password successfully changed');
                this.props.history.change('/')
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
                            Reset Password
                    </Header>

                        <Form size='large' onSubmit={this.handleSubmit}>
                        { this.state.isFormValidated ? 
                        <div>
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
                        icon='lock'
                        iconPosition='left'
                        name='password'
                        id='password'
                        placeholder='New Password'
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
                            <Form.Input
                                fluid
                                icon='mail'
                                iconPosition='left'
                                name='email'
                                id='email'
                                placeholder='E-mail Address'
                                type='text'
                                onChange={this.handleChangeEmail} value={this.state.email} />
                           
                            <p class="text-muted">{this.state.errorsValidation}</p>
                            </div>
                            }
                            <span >
                            {!(this.state.isFormValidated) ?
                                <Button
                                    type="submit"
                                    fluid 
                                    size='large'>
                                    Send Email
                                </Button>
                                :
                                <Button
                                    onClick={this.handleSubmitOTP}
                                    fluid size='large'>
                                    VERIFY AND SET
                                </Button>
                            }
                            </span>
                        </Form>
                        
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
            </div>
        )
    }
}