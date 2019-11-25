import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.redirectRegister = this.redirectRegister.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  
  handleValidations() {
    // return {
    //   success: true,
    //   message: 'Success!'
    // }
    let email = this.state.email;
    let password = this.state.password;
     let formIsValid = true;
     let errors = {};

      //Password Validations
      if(!password ){
        formIsValid = false;
        errors.password = 'Password is Required'
    }

    // Emails Validations
    if(email.length == 0){
        formIsValid = false;
        errors.email = 'Email is Required'
    }
    else if(typeof email !== "undefined"){
        if(!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$/))
            {
                formIsValid = false;
                errors.email = "Please Enter Valid Email Address";
            }
    }

    this.setState( {errors : errors});
    return formIsValid;
  }

  handleSubmit(e){
    e.preventDefault();
    var isValid = this.handleValidations();
    if(this.handleValidations()){
      alert('Form submitted SuccessFully');
  }
  else{
      return;
  }
    if (isValid == true) {
      axios.post('http://localhost:4000/customers/login', {email:this.state.email, password: this.state.password}).then(response => {  
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
          console.log(error.stack);
      })
    } else {
        this.setState({
            errors: isValid.message
        })
    }
  }

  redirectRegister() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className="background">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <Segment stacked>
      <Link to='/'>
        <Icon link name='close' />
      </Link>
        <Header as='h2' textAlign='center' style={{color: 'rgb(90, 78, 255)'}}>
          Sign In
        </Header>
        <Form size='large' onSubmit={this.handleSubmit}>
          
            <Form.Input
              type="text"
              name="email"
              id="email"
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail Address'
              onChange={this.handleChangeEmail} value={this.state.email} />
              <p style={{color: 'red'}} > {this.state.errors.email} </p> 

            {/* <PasswordMask > */}
            <Form.Input
              fluid
              icon='lock'
              name="password"
              id="password"
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={this.handleChangePassword} 
              value={this.state.password} />
              <p style={{color: 'red'}} > {this.state.errors.password} </p> 

              {/* </PasswordMask> */}

            <span style={{float: 'left'}}>
            <Button 
            type="submit"
            fluid 
            size='large'>
              Login
            </Button>
            </span>
          
        
        <span style={{float: 'right'}}>
          New to us? &nbsp; &nbsp;
          {/* <Button onClick={this.redirectRegister}>Register</Button> */}
          <Link to='/register'>Register</Link>
        </span>
        <br/><br/>
        </Form>
        </Segment>
      </Grid.Column>
    </Grid>
    </div>
    )
  }
}