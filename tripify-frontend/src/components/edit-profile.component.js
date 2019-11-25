import React from 'react'
import { Grid, Header, Segment, Form, Container, Card, Icon, Accordion }
    from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditProfile extends React.Component {
    // Accordion
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            oldPassword: '',
            newPassword: '',
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
        this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeIdentification = this.handleChangeIdentification.bind(this);
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
    handleChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangeMobile(e) {
        this.setState({
            mobile: e.target.value
        })
    }
    handleChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }
    handleChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }
    handleChangeConfirmPassword(e) {
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
    // Old password must match
    handleValidations() {
        if (this.state.newPassword !== this.state.confirmPassword) {
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

        if (isValid.success) {
            this.setState({
                isFormValidated: true
            })
            axios.post('http://localhost:4000/customers/prepareAndSendOTP', { name: this.state.firstName, email: this.state.email }).then(response => {
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
        if (this.state.OTP == this.state.OTPToMatch) {
            let user = {
                customerName: this.state.firstName + ' ' + this.state.lastName,
                customerEmail: this.state.email,
                customerPhone: this.state.mobile,
                customerPassword: this.state.password,
                customerAge: this.state.age,
                customerIdentification: this.state.identification,
                customerGender: this.state.gender
            }
            console.log(user);
            axios.post('http://localhost:4000/customers/', user).then(response => {
                console.log(response.data.message);
                axios.post('http://localhost:4000/customers/login', { email: user.customerEmail, password: user.customerPassword }).then(response => {
                    localStorage.setItem('isLoggedin', "true");
                    localStorage.setItem('customer', JSON.stringify(response.data.customer));
                    this.props.history.push('/')
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
        const { activeIndex } = this.state
        return (
            <div className="background">
                <Container>
                    <Header as='h2' textAlign='center' style={{ color: 'rgb(90, 78, 255)' }}>
                        Edit Profile
                    </Header>
                    <Segment>
                        <Grid columns={3} style={{ paddingLeft: '2%' }}>
                            <Grid.Row >
                                <Grid.Column>
                                    Name: <b>NAME</b>
                                </Grid.Column>
                                <Grid.Column>
                                    Gender: <b>GENDER</b>
                                </Grid.Column>
                                <Grid.Column>
                                    Age: <b>AGE</b>
                                </Grid.Column>
                            </Grid.Row>
                            <div className="text-dark"><hr /></div>
                            <Grid.Row >
                                <Grid.Column>
                                    Email: <b>EMAIL</b>
                                </Grid.Column>
                                <Grid.Column>
                                    Mobile: <b>MOBILE</b>
                                </Grid.Column>
                                <Grid.Column>
                                    Passport Number: <b>PASSPORT OR ID</b>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                            >
                                <Button
                                    type="submit"
                                    fluid
                                    size='large'>
                                    <p><Icon name='edit' />Edit</p>
                                </Button>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <Form size='large' onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
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
                                    </Form.Group>
                                    <div  style={{ float: 'right' }}>
                                        <Button
                                            type="submit"
                                            fluid
                                            size='large'>
                                            <p><Icon fitted name='edit' /> Update</p>
                                        </Button> &nbsp; &nbsp; &nbsp;
                                        <Button
                                            type="submit"
                                            fluid
                                            size='large'>
                                            <p><Icon inverted fitted name='repeat' /> Reset</p> 
                                        </Button>
                                    </div>
                                </Form>
                            </Accordion.Content>
                            <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={this.handleClick}
                            >
                                <Header as='h5'>
                                    <Icon name='dropdown' />
                                    Change Password
                                </Header>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            name='oldPassword'
                                            id='oldPassword'
                                            placeholder='Old Password'
                                            type='password'
                                            onChange={this.handleChangeOldPassword} value={this.state.oldPassword} />

                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            name='newPassword'
                                            id='newPassword'
                                            placeholder='New Password'
                                            type='password'
                                            onChange={this.handleChangeNewPassword} value={this.state.newPassword} />

                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            name='confirmPassword'
                                            id='confirmPassword'
                                            placeholder='Confirm Password'
                                            type='password'
                                            onChange={this.handleChangeConfirmPassword} value={this.state.confirmPassword} />
                                    </Form.Group>
                                    <div style={{ float: 'right' }}>
                                        <Button
                                            type="submit"
                                            fluid
                                            size='large'>
                                            <p><Icon fitted name='edit' /> Update </p>
                                        </Button> &nbsp; &nbsp; &nbsp;
                                        <Button
                                            type="submit"
                                            fluid
                                            size='large'>
                                            <p><Icon inverted fitted name='repeat' /> Reset</p> 
                                        </Button>
                                    </div>
                                    <br /><br /><br />
                                </Form>
                            </Accordion.Content>
                        </Accordion>
                    </Segment>
                </Container>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Segment stacked>

                            <Header as='h2' textAlign='center' style={{ color: 'rgb(90, 78, 255)' }}>
                                Edit Profile
                        </Header>
                            <Form size='large' onSubmit={this.handleSubmit}>

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
                                    name='oldPassword'
                                    id='oldPassword'
                                    placeholder='Old Password'
                                    type='password'
                                    onChange={this.handleChangeOldPassword} value={this.state.oldPassword} />

                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='newPassword'
                                    id='newPassword'
                                    placeholder='New Password'
                                    type='password'
                                    onChange={this.handleChangeNewPassword} value={this.state.newPassword} />

                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Confirm Password'
                                    type='password'
                                    onChange={this.handleChangeConfirmPassword} value={this.state.confirmPassword} />

                                <span style={{ float: 'left' }}>
                                    <Button
                                        type="submit"
                                        fluid
                                        size='large'>
                                        Update
                                </Button>

                                </span>
                                <span style={{ float: 'right' }}>
                                    <Link to='/'>
                                        <Button style={{ backgroundColor: 'red' }}
                                            type="submit"
                                            fluid
                                            size='large'>
                                            <Icon inverted name='close' />Cancel
                                        </Button>
                                    </Link>
                                </span>
                                <br /><br />
                            </Form>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}