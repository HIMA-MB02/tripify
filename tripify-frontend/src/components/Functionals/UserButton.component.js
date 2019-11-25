import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Dropdown from 'react-bootstrap/Dropdown';
import {Icon} from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

export default class UserButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.userName
    }

    this.logout = this.logout.bind(this);
  }
  logout() {
    localStorage.clear();
    window.location.reload();
    this.props.history.push('/') 
   }
  render() {
  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Icon name='user outline'/>Hi, {this.state.name.slice(0, 10)}..
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
              <Dropdown.Item href="/pageConstruction" >My Bookings</Dropdown.Item>
              <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
      </Grid>
    </div>
  );
}
}