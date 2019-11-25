import React, { Component } from 'react';
import {
    Container, Grid, Header, Icon, Image, Menu, Responsive,
    Segment, Sidebar, Visibility
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import UserButton from './Functionals/UserButton.component';

export default class NavBar extends React.Component {

    tripify() {
        return <Redirect to="/" />
    }

    handleCard = (selection) => {
        this.setState({
            currentSelection: selection
        })
    }
    constructor(props) {
        super(props);
       
        this.state  = {
          isLoggedin: false
        }
      }
    componentDidMount() {
        if(localStorage.getItem('isLoggedin') == "true") {
          this.setState({
              isLoggedin: true,
              currentUser: JSON.parse(localStorage.getItem('customer'))
          });
        }
      }
    render() {
        return (
            <Container fluid style={{ backgroundColor: 'black' }}>
            <Menu
                inverted
                size='large'
                style={{ backgroundColor: 'black', fontFamily: "'Alegreya Sans', sans-serif",
                    paddingBottom: '1%' }}
            >
                <Menu.Item>
                    <Link to='/'>Tripify</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/' onClick={() => {localStorage.setItem("navSelection" ,'flights')}}>
                        <Icon name='plane' />
                        <p>Flights</p>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/' onClick={() => {localStorage.setItem("navSelection" ,'trains')}}>
                        <Icon name='train' />
                        <p>Trains</p>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/' onClick={() => {localStorage.setItem("navSelection" ,'buses')}}>
                        <Icon name='bus' />
                        <p>Buses</p>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/' onClick={() => {localStorage.setItem("navSelection" ,'hotels')}}>
                        <Icon name='hotel' />
                        <p>Hotels</p>
                    </Link>
                </Menu.Item>
                <Menu.Item position='right'>
                {this.state.isLoggedin? 
                <UserButton history={this.props.history} userName={this.state.currentUser.customerName}/>
                :
                <div 
            >
                <Link to='/login'><div style={{ color: 'white', backgroundColor: 'black' }}>
                    <Icon name='user circle' />
                    <p>Login/ Register</p>
                    </div></Link>
              </div>
          } 
                
                </Menu.Item>
            </Menu>
            </Container>
        )
    }
}
