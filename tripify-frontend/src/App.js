import React, { Component } from 'react';
import HomepageLayout from './components/home-react.component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FlightBooking from './components/booking-reviews/flight-booking-review.component'
import BusBooking from './components/booking-reviews/bus-booking-review.component';
import TrainBooking from './components/booking-reviews/train-booking-review.component';
import HotelBooking from './components/booking-reviews/hotel-room.component'
import TrainList from './components/lists/train-list.component'
import BusList from './components/lists/bus-list.component'
import HotelList from './components/lists/hotel-list.component';
import FlightList from './components/lists/flight-list.component';
import Register from './components/register.component'
import Login from './components/login.component';
import Profile from './components/profile.component';
import TravellerDetails from './components/traveller-details.component'
import BookingPayment from './components/booking-payment.component';
import ManageBooking from './components/manage-booking.component';
import Ticket from './components/ticket.component';
import PageConstruction from './components/page-construction.component';
import ForgotPassword from './components/forgot-password.component';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomepageLayout} />
          {/*LOGIN AND REGISTER*/}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          {/*LIST PATHS*/}
          <Route exact path="/flights" component={FlightList} />
          <Route exact path="/trains" component={TrainList} />
          <Route exact path="/buses" component={BusList} />
          <Route exact path="/hotels" component={HotelList} />
          {/*BOOKINGS PATHS */}
          <Route exact path="/flight-booking" component={FlightBooking}/>
          <Route exact path="/bus-booking" component={BusBooking}/>
          <Route exact path="/train-booking" component={TrainBooking}/>
          <Route exact path="/hotel-booking" component={HotelBooking} />
          {/*OTHERS*/}
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/manage-bookings' component={ManageBooking} />
          <Route exact path='/traveller-details' component= {TravellerDetails} />
          {/*BOOKING PAYMENT*/}
          <Route exact path='/payment' component={BookingPayment}/>
          <Route exact path='/ticket' component={Ticket}/>
          <Route exact path='/pageConstruction' component={PageConstruction}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;