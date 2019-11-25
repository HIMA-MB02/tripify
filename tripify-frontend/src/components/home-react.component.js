import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container, Grid, Header, Icon, Image, Menu, Responsive,
  Segment, Dropdown, Visibility
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightCardExp from './cards/flightCardExp';
import TrainCard from './cards/trainCard';
import BusCard from './cards/busCard'
import HotelCard from './cards/hotelCard'
import '../App.css';
import {Redirect} from 'react-router-dom'
import UserButton from './Functionals/UserButton.component'
import CustomCarousel from './Functionals/customCarousel';
import Image1 from '../../src/image1.jpg';
import Image2 from '../../src/image2.png';

// React Static to prerender our docs with server side rendering
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const particleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

export default class HomepageLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state  = {
      currentSelection: 'flights',
      currentUser: {},
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
      if(localStorage.getItem("navSelection") != null) {
        this.setState({
          currentSelection: localStorage.getItem("navSelection")
        })
      }
      localStorage.removeItem("navSelection"); 
    
    this.setCard();
  }
  tripify() {
    return <Redirect to="/" />
  }
  setCard = () => {
    switch(this.state.currentSelection) {
      case 'flights' :{ return <FlightCardExp />}
    case 'trains': { return <TrainCard  /> }
      case 'buses': return <BusCard />
      case 'hotels': return <HotelCard />
      default: return <FlightCardExp />
    }
  }

  handleCard = (selection) =>  {
    this.setState({
      currentSelection: selection
    })
  }

  state = {}
  // const classes = useStyles();
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { fixed } = this.state
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        
          <Segment
            inverted
            textAlign='center'
            style={{
              padding: '0em 0em', position: 'relative',
              background: 'linear-gradient(to bottom, rgb(162, 155, 254),  rgb(0, 0, 0))'
            }}
            vertical
          >
            <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
           
            <Particles params={particleOpt} style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "60%"
            }} />

            <Container className="centered" fluid={fixed}
              style={{ position: 'relative', top: '30px', width: '723px', zIndex: 2 }}>
              <Menu className="row"
                fixed={fixed ? 'top' : null}
                inverted
                pointing
                secondary
                size='large'
                style={{ backgroundColor: 'black', fontFamily: "'Alegreya Sans', sans-serif" }}
              >
                <Menu.Item>               
                  &nbsp; &nbsp; 

                  <Link onClick={this.tripify}>Tripify</Link>
                </Menu.Item>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Menu.Item>
                  <Link onClick= {() => this.handleCard('flights')}>
                    <Icon name='plane' />
                    <p>Flights</p>
                  </Link>
                </Menu.Item>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Menu.Item>
                <Link onClick= {() => this.handleCard('trains')}>
                    <Icon name='train' />
                    <p>Trains</p>
                  </Link>
                </Menu.Item>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Menu.Item>
                <Link onClick= {() => this.handleCard('buses')}>
                    <Icon name='bus' />
                   <p>Buses</p>
                  </Link>
                </Menu.Item>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <Menu.Item>
                  <Link onClick= {() => this.handleCard('hotels')}>
                    <Icon name='hotel' /> 
                    <p>Hotels</p>
                  </Link>
                </Menu.Item>
                <Menu.Item position='right'>
                    {this.state.isLoggedin?  <UserButton history={this.props.history} userName={this.state.currentUser.customerName}/> :
                      <div
                      style={{backgroundColor: 'black'}}
                    >
                      <Link to='/login'>
                        <div style={{ color: 'white', backgroundColor: 'black' }}>
                          <Icon name='user circle'/>
                          <p>Login/ Register </p>
                        </div>
                      </Link>
                    </div>
                  }
                </Menu.Item>
                
              </Menu>
              
            </Container>
            </Visibility>
            {/* <HomepageHeading style={{ position: 'relative', left: '20px' }} /> */}
            <div className="container" style={{ minHeight: '88vh', minWidth: '100%' }}>
              <div className="row">
                <div className="col">
                  {
                    this.setCard()
                  }
                  
                </div>
              </div>
            </div>
          </Segment>

        

          <Container>
         <CustomCarousel/>
        </Container>
        <a href='#' className="text-right">
            <h1><Icon name='chevron circle up' /></h1>
          </a>
        {/* About US  */}
        <Segment style={{ backgroundColor: "rgb(231, 231, 231)", margin: "0" }}>
          <Grid columns={3} container divided inverted stackable textAlign='justified' style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Grid.Row>
              <Grid.Column >
                <Header inverted as='h4' style={{ color: "rgb(0, 0, 0)" }} content='Why Tripify?' />
                <p>The leading player in online flight bookings in India, Tripify offers great offers,
                  some of the lowest airfares, exclusive discounts and a seamless online booking experience.
                  Flight, hotel and holiday bookings through the desktop or mobile site is a delightfully
                  customer friendly experience, and with just a few clicks you can complete your booking.
                  With features like Instant Discounts, Fare Calendar, MyRewards Program, MyWallet and
             many more.</p>
              </Grid.Column>
              <Grid.Column>
                <Header inverted as='h4' style={{ color: "rgb(0, 0, 0)" }} content='Booking Flights with Tripify' />
                <p>Book your flights tickets with India's leading flight booking company since the year 2000.
                  While booking flights with Tripify, you can expect the ultimate online booking experience.
                  With premium customer service, 24/7 dedicated helpline for support, and over 5 million
                  delighted customers, Tripify takes great pride in enabling customer satisfaction.
                  With a cheapest flight guarantee, book your tickets at the lowest airfares.
                  Avail great offers, exclusive deals for loyal customers and get instant updates
             for your flight status and fare drops.</p>
              </Grid.Column>
              <Grid.Column >
                <Header inverted as='h4' style={{ color: "rgb(0, 0, 0)" }} content='Domestic Flights with Tripify' />
                <p>Tripify is India's leading player for flight bookings, and have a dominant position in the domestic
                  flights sector. With the cheapest fare guarantee, experience great value at the lowest price.
                  Instant notifications ensure current flight status, instant fare drops, amazing discounts,
             instant refunds and rebook options, price comparisons and many more interesting features.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {/*FOOTER*/}
        <Container style={{ padding: '0 0em', margin: '0',width: '100%', backgroundColor: '#212121'}}>
           &nbsp; <img src={Image1} style={{width: '15%', height: '7%', paddingTop: '10px', paddingBottom: '10px',
          borderRadius: '10px'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
            <img src={Image2}  style={{width: '15%', height: '7%', paddingTop: '10px', paddingBottom: '10px', ImageborderRadius: '10px'}}/>
        </Container>
        <Container style={{ padding: '0em 0em', margin: '0', width: '100%' }}>
          <Menu style={{backgroundColor: 'black', borderRadius: '0'}}>
            <Menu.Item as='h1'>
              <Icon inverted name='facebook f' />
              <Icon inverted name='mail' />
              <Icon inverted name='twitter' />
            </Menu.Item>
            <Menu.Item position='right'>
             <Header inverted as='h1'> &copy;TRIPify</Header>
            </Menu.Item>
          </Menu>
        </Container>
      </Responsive>
    )
  }
} 
